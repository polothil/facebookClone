import React, { useState } from 'react';
import { useRef } from 'react';
import { createPost } from '../../functions/post';
import useClickOutside from '../../helpers/useClickOutside';
import AddToYourPost from './AddToYourPost/AddToYourPost';
import EmojiPickerBackground from './EmojiPickerBackground/EmojiPickerBackground';
import ImagePreview from './ImagePreview/ImagePreview';
import PulseLoader from 'react-spinners/PulseLoader';
import './CreatePostPopup.css';
import PostError from './PostError/PostError';
import dataUriToBlob from '../../helpers/dataUriToBlob';
import { uploadImages } from '../../functions/uploadImages';

const CreatePostPopup = ({ user, setCreatePostVisible }) => {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState('');
  const popup = useRef(null);
  useClickOutside(popup, () => {
    setCreatePostVisible(false);
  });

  const postSubmit = async () => {
    if (background) {
      setLoading(true);
      const response = await createPost(
        null,
        background,
        text,
        null,
        user.id,
        user.token
      );
      setLoading(false);

      if (response === 'ok') {
        setBackground('');
        setText('');
        setCreatePostVisible(false);
      } else setError(response);
    } else if (images && images.length) {
      setLoading(true);
      const postImages = images.map((img) => {
        return dataUriToBlob(img);
      });
      const path = `${user.username}/post Images`;
      let formData = new FormData();
      formData.append('path', path);
      postImages.forEach((image) => {
        formData.append('file', image);
      });
      const response = await uploadImages(formData, path, user.token);
      await createPost(null, null, text, response, user.id, user.token);
      setLoading(false);
      setText('');
      setCreatePostVisible(false);
      setImages('');
    } else if (text) {
      const response = await createPost(null, null, text, null, user.id, user.token);
      setLoading(false);

      if (response === 'ok') {
        setBackground('');
        setText('');
        setCreatePostVisible(false);
      } else setError(response);
    } else {
      console.log('Nothing');
    }
  };

  return (
    <div className='blur'>
      <div className='postBox' ref={popup}>
        {error && <PostError error={error} setError={setError} />}
        <div className='box_header'>
          <div className='small_circle' onClick={() => setCreatePostVisible(false)}>
            <i className='exit_icon'></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className='box_profile'>
          <img src={user.picture} alt='' className='box_profile_img' />
          <div className='box_col'>
            <div className='box_profile_name'>
              {user.first_name} {user.last_name}
            </div>
            <div className='box_privacy'>
              <img src='../../../icons/public.png' alt='' />
              <span>Public</span>
              <i className='arrowDown_icon'></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackground
              text={text}
              setText={setText}
              user={user}
              setBackground={setBackground}
              background={background}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button className='post_submit' onClick={postSubmit} disabled={loading}>
          {loading ? <PulseLoader color='#fff' size={5} /> : 'Post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePostPopup;
