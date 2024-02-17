import { CloseRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import { CameraContext } from "../Pages/Scan";

function CameraView() {
  const CameraProvider = useContext(CameraContext);
  const streamRef = useRef<{ stream: MediaStream | null }>({ stream: null });
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [captured, setCaptured] = useState<string | null>(null);


  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {}, audio: false });
        //stop using the cameras after granting access to enumerate them
        stream.getTracks().forEach(track => track.stop());

        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        // console.log(videoDevices)
        if (videoDevices.length > 0) {
          CameraProvider?.setSelectedDevice(videoDevices[0].deviceId);
        }
        CameraProvider?.setCameraList(videoDevices);
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    }
    setupCamera();

  }, [CameraProvider]);

  useEffect(() => {
    //stops the connection to the camera device every time a new camera device is selected
    if (streamRef.current.stream) {
      streamRef.current.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    closePhoto();
    console.log("videoRef");
    console.log(videoRef.current)
    connectCamera();

    return () => {
      streamRef.current.stream?.getTracks().forEach((track) => {
        track.stop();
      })
    };

  }, [CameraProvider?.selectedDevice]);

  useEffect(() => {
    if (CameraProvider?.click && captured === null)
      handleCapture();
  }, [CameraProvider?.click])

  //closes the photo canvas after successful saving of score
  useEffect(() => {
    if (CameraProvider?.closePhoto) {
      closePhoto();
      connectCamera();
      CameraProvider.setClosePhoto(false);
    }
  }, [CameraProvider?.closePhoto])


  // closes the photo captured, called when a new device is selected
  const closePhoto = () => {
    let photo = photoRef.current;
    photo?.getContext('2d')?.clearRect(0, 0, photo.width, photo.height)
    setCaptured(null);
  }

  // connects to a camera stream
  const connectCamera = () => {
    if (CameraProvider?.selectedDevice) {
      navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: CameraProvider?.selectedDevice } } }).then(stream => {
        videoRef.current!.srcObject = stream;
        streamRef.current.stream = stream;
        // setCameraStream(stream);
      }).catch(error => {
        console.error(error);
      });
    }
  }

  const handleCapture = () => {
    if (videoRef != null) {
      var photo = photoRef.current;
      var video = videoRef.current;
      photo!.width = video!.videoWidth;
      photo!.height = video!.videoHeight;
      var context = photo?.getContext('2d');
      context?.drawImage(video!, 0, 0, video?.videoWidth!, video?.videoHeight!);
      const imgURL = photo?.toDataURL('image/png', 0.9);
      // console.log("imahe" + imgURL);
      setCaptured(imgURL!);

      photo!.toBlob((blob) => {
        CameraProvider?.sendImage(blob!);
        // console.log(blob);
      }, "image/png", 1.0);


    }
  }


  return (
    <>
      {
        captured ?
          (<><img src={captured!} width="100%" />
            <Box
              component="div"
              position="absolute"
              top="4px"
              left="324px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <IconButton sx={{ marginX: "10px" }}
                size='medium'
                onClick={() => {
                  closePhoto();
                  connectCamera();
                }}
              >
                <CloseRounded />
              </IconButton>
            </Box>
          </>
          ) :
          (<video ref={videoRef} autoPlay playsInline width="100%" />)
      }
      <canvas ref={photoRef} style={{ display: 'none' }} />
    </ >
  );
}

export default CameraView;
