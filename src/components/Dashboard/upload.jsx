import React, { useState } from "react";
import axios from 'axios';
import classNames from "classnames";

const Upload = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    num_pages: '',
    image: null,
    pdf: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('num_pages', formData.num_pages);
    if (formData.image) {
      for (let i = 0; i < formData.image.length; i++) {
        data.append('image', formData.image[i]);
      }
    }
    if (formData.pdf) {
      data.append('pdf', formData.pdf[0]);
    }

    try {
      const res = await axios.post('http://localhost:3306/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center flex-col">
      <div className="w-[78vw] bg-gray-100 dark:bg-[#E7E5E4] flex items-center justify-center m-5 shadow-md rounded-2xl flex-col px-3 py-5">
        <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-[85%] h-10 rounded-lg border border-gray-400 text-100 py-2 pl-16 m-5" placeholder="Title" />
        <textarea name="description" value={formData.description} onChange={handleChange} cols="30" rows="10" className="w-[85%] h-40 rounded-lg border border-gray-400 text-100 py-2 pl-16 mb-5" placeholder="Description"></textarea>
        <label htmlFor="image" className="text-xl mb-2">Image:</label>
        <input type="file" name="image" id="image" onChange={handleFileChange} className="w-[85%] h-12 rounded-lg border border-gray-400 text-100 py-2 pl-16 mb-5" accept="image/*" multiple />
        <label htmlFor="pdf" className="text-xl mb-2">PDF:</label>
        <input type="file" name="pdf" id="pdf" onChange={handleFileChange} className="w-[85%] h-12 rounded-lg border border-gray-400 text-100 py-2 pl-16 mb-5" accept="application/pdf" />
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-[85%] h-10 rounded-lg border border-gray-400 text-100 py-2 pl-16 m-5" placeholder="Category" />
        <input type="number" name="num_pages" value={formData.num_pages} onChange={handleChange} className="w-[85%] h-10 rounded-lg border border-gray-400 text-100 py-2 pl-16 m-5" placeholder="Number of pages" />
        <button onClick={handleSubmit} className={classNames({
          'theme-btn-shadow rounded-xl bg-[#3B82F6]': true,
          'px-4 py-2': true,
          'monu text-sm text-white font-normal': true,
          'mobile:text-xs': true,
        })}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Upload;
