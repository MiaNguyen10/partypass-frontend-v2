import React from "react";

import PropTypes from "prop-types";

const PreviewFile = ({ files, width, height }) => {
  const [previews, setPreviews] = React.useState([]);

  React.useEffect(() => {
    if (!Array.isArray(files)) {
      console.error("files prop is not an array:", files);
      return;
    }

    const newPreviews = [];
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const isImage = file && file["type"].split("/")[0] === "image";
        newPreviews.push(isImage ? reader.result : "/default.svg");
        if (newPreviews.length === files.length) {
          setPreviews(newPreviews);
        }
      };
    });
  }, [files]);

  return (
    <div className="flex flex-row flex-wrap">
      {previews.map((preview, index) => (
        <div key={index} className="px-2 pb-2 relative">
          <img src={preview} alt="Preview" width={width} height={height} />
        </div>
      ))}
    </div>
  );
};

PreviewFile.propTypes = {
  files: PropTypes.arrayOf(PropTypes.instanceOf(File)).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleRemove: PropTypes.func,
};

export default PreviewFile;
