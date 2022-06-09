import React from 'react';
import EmojiPickerBackground from '../EmojiPickerBackground/EmojiPickerBackground';

const ImagePreview = ({ text, setText, user }) => {
  return (
    <div className='overflow_a'>
      <EmojiPickerBackground text={text} setText={setText} user={user} type2 />
    </div>
  );
};

export default ImagePreview;
