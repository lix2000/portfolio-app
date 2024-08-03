const DangerousHtml = (text: string) => {
    if (!text) return null
    return <span dangerouslySetInnerHTML={{ __html: text }} />
  }
  
  export default DangerousHtml
  