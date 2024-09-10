// components/PdfViewer.js
import React, { useEffect, useRef, useState } from 'react'
import { PdfViewerComponent } from '@syncfusion/ej2-react-pdfviewer'
import { useSelector } from 'react-redux'
import {registerLicense} from "@syncfusion/ej2-base"

registerLicense("Ngo9BigBOggjHTQxAR8/V1NCaF1cWWhAYVFwWmFZfVpgcF9FYFZVTWYuP1ZhSXxXdk1hXn9ac3VVRWNaUkQ=")

const PdfViewer = () => {
  const pdfViewerRef = useRef(null)
  const { fileData, fileDataIsSuccess } = useSelector(state => state.file)
  const [pdfBlobUrl, setPdfBlobUrl] = useState('')

  function arrayBufferToBase64(arrayBuffer) {
    // Convert ArrayBuffer to a binary string
    const uint8Array = new Uint8Array(arrayBuffer)
    let binaryString = ''
    for (let i = 0; i < uint8Array.byteLength; i++) {
      binaryString += String.fromCharCode(uint8Array[i])
    }

    // Encode binary string to Base64
    return btoa(binaryString)
  }

  useEffect(() => {
    if (fileDataIsSuccess && fileData) {
      // Convert ArrayBuffer to Base64
      const base64 = arrayBufferToBase64(fileData)

      // Create a Blob URL from Base64
      // const blobUrl = base64ToBlobUrl(base64, 'application/pdf')

      // Set the Blob URL to state
      pdfViewerRef.current.load('data:application/pdf;base64,' + base64, null)
      // setPdfBlobUrl(blobUrl)

      // Cleanup the Blob URL when component unmounts or fileData changes
      return () => {
        // URL.revokeObjectURL(blobUrl)
      }
    }
  }, [fileData, fileDataIsSuccess])

  // useEffect(() => {
  //   if (pdfViewerRef.current && pdfBlobUrl) {
  //     try {
  //       pdfViewerRef.current.load(pdfBlobUrl)
  //     } catch (e) {
  //       console.error('Error loading PDF:', e)
  //     }
  //   }
  // }, [pdfBlobUrl])

  return (
    <div style={{ height: '100%' }}>
      <PdfViewerComponent
        style={{ height: '100%' }}
        ref={pdfViewerRef}
        id='pdfViewer'
        serviceUrl='https://ej2services.syncfusion.com/production/web-services/api/pdfviewer' // Ensure this is correct
        documentPath={pdfBlobUrl}
      />
    </div>
  )
}

export default PdfViewer
