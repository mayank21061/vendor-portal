import { useEffect, useRef } from 'react'

export default function PdfViewer() {
  let viewer = useRef(null)

  useEffect(() => {
    import('@pdftron/webviewer').then(() => {
      WebViewer(
        {
          path: '/webviewer/lib',
          initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf'
        },
        viewer.current
      ).then(instance => {
        const { docViewer } = instance
        console.log(docViewer)
        // you can now call WebViewer APIs here...
      })
    })
    return () => {
      viewer = null
    }
  }, [])

  return (
    <div className='MyComponent'>
      <div className='webviewer' ref={viewer} style={{ height: '100vh' }}></div>
    </div>
  )
}
