import React, {useState, useEffect} from 'react';
import httpClient from './httpClient';

function App() {

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [image, setImage] = useState('')
  const [images, setImages] = useState('')

  const handleSubmit = async () => {
    if (image) {
        setSuccess(false);
        setError(false);
        setLoading(true);
        const config = {
            headers: {
                "Content-Type":"application/json",
            }
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            await httpClient.post('photos/upload', formData, config);
            setSuccess(true);
        } catch (error) {
            setError(error);
        }
        setLoading(false);
    } else {
      alert('Oops!, you forgot to select an image.');
    }
  }

  useEffect(() => {
    const fetchFiles = async () => {
      try {
          const {data} = await httpClient.get('photos');
          setImages(data);
          console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchFiles();
  }, [])
  

  return (
    loading ? <h3>Uploading...</h3> 
            : error ? <h3>{error.message}</h3> 
            : <div className="App">
          <form onSubmit={handleSubmit}>
            <input type="file" name="file" onChange={(e) => setImage(e.target.files[0])} />
            <input type="submit" value="Upload" />
          </form>
      {
        success ? <h3>File Uploaded Successfully</h3> : ''
      }
      <div >
        {
          images ? images.map(i => <div key={i.id}>
            <p>Image {i.id+1} : </p>
            <img width={100} src={i.image} alt={i} />
          </div>) : ''
        }
      </div>
    </div>
  );
}

export default App;
