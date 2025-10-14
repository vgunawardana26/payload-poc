const handleImageUpload = (event, editor) => {
  const file = event.target.files?.[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      editor?.chain().focus().setImage({ src: reader.result }).run();
    };
    reader.readAsDataURL(file);
  }
  event.target.value = "";
};

export default handleImageUpload;
