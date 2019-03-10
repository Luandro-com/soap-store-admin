import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

export default ({ onEditorStateChange, value }) => {
  if (window) {
    return <ReactQuill value={value}
      onChange={e => onEditorStateChange(e)}
    />
  } else {
    return <input type="textarea" />
  }
}