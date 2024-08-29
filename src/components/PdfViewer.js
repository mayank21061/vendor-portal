import { CircularProgress } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function PdfViewer() {
  const viewerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fileData = useSelector(state => state.file.fileData)

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    const initializeViewer = async () => {
      if (!fileData) return

      try {
        const WebViewer = (await import('@pdftron/webviewer')).default

        WebViewer(
          {
            path: '/webviewer/lib',
            licenseKey: 'demo:1723009532106:7e7959410300000000cea9ba88d3d46cbf78c57e456d68bdacb7905378',
            initialDoc: '/sample.pdf'
          },
          viewerRef.current
        )
          .then(instance => {
            if (fileData instanceof Blob) {
              instance.UI.loadDocument(fileData, { filename: 'myfile.pdf' })
            } else if (fileData instanceof ArrayBuffer) {
              const blob = new Blob([fileData], { type: 'application/pdf' })
              console.log(blob)
              instance.UI.loadDocument(blob, { filename: 'myfile.pdf' })
            } else if (fileData && typeof fileData.blob === 'function') {
              fileData.blob().then(blob => {
                instance.UI.loadDocument(blob, { filename: 'myfile.pdf' })
              })
            } else {
              throw new Error('Unsupported fileData format')
            }

            setLoading(false)
          })
          .catch(e => {
            console.error('Error initializing WebViewer:', e)
            setError('Error initializing PDF viewer. The file might not be linearized or supported.')
            setLoading(false)
          })
      } catch (error) {
        console.error('Error loading WebViewer module:', error)
        setError('Failed to load the PDF viewer module.')
        setLoading(false)
      }
    }

    initializeViewer()
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
      {error && (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'red'
          }}
        >
          {error}
        </div>
      )}
      <div className='MyComponent' style={{ height: '100%' }}>
        <div className='webviewer' ref={viewerRef} style={{ height: '100%' }}></div>
      </div>
    </>
  )
}
