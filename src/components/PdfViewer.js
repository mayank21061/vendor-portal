import { CircularProgress } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFileAction } from 'src/redux/features/fileUrlSlice'

export default function PdfViewer({ blobData }) {
  let viewer = useRef(null)
  let blob
  const fileData = useSelector(state => state.file.fileData)

  useEffect(async () => {
    if (fileData) {
      blob = await fileData?.blob()
      console.log(blob)
    }
  }, [fileData])
  // useEffect(async () => {
  //   if (fileData) {
  //     let blob = await fileData.blob()
  //     let file = new File([blob], 'demo.pdf')
  //     console.log(file)
  //   }
  // }, [fileData])
  // const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   if (fileUrl) {
  //     dispatch(getFileAction({ fileUrl }))
  //   }
  // }, [fileUrl])

  useEffect(() => {
    import('@pdftron/webviewer').then(() => {
      WebViewer(
        {
          path: '/webviewer/lib',
          licenseKey: 'demo:1723009532106:7e7959410300000000cea9ba88d3d46cbf78c57e456d68bdacb7905378',
          initialDoc: '/sample.pdf'
        },
        viewer.current
      )
        .then(instance => {
          console.log(instance)
          console.log(fileData)
          // let file = new File([blob], 'demo.pdf')
          instance.UI.loadDocument(blob, { filename: 'myfile.pdf' })
          // DocumentViewer?.zoomTo(1)
          setLoading(false)
          // you can now call WebViewer APIs here...
        })
        .catch(e => console.log(e))
    })
    return () => {
      viewer = null
    }
  }, [fileData])

  return (
    <>
      {loading && (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </div>
      )}
      <div className='MyComponent' style={{ height: '100%' }}>
        <div className='webviewer' ref={viewer} style={{ height: '100%' }}></div>
      </div>
    </>
  )
}
