import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateNews.css";

function CreateNews() {
  const navigate = useNavigate();
  const [catData, setCatData] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    categoryId: "",
  });
  const [image, setImage] = useState();
  async function fetchCategory() {
    try {
      let res = await fetch(`http://127.0.0.1:3000/api/category/`);
      res = await res.json();
      setCatData(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const naavigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (token) {
      let user = localStorage.getItem("userInfo");
      user = JSON.parse(user);
      if (!(user.role === "admin")) {
        naavigate("/");
      } else {
        fetchCategory();
      }
    } else {
      naavigate("/login");
    }
  }, []);

  async function handlesubmit(e) {
    e.preventDefault();
    console.log(data.categoryId);
    const news = new FormData();
    news.append("title", data.title);
    news.append("description", data.description);
    news.append("slug", data.title);
    news.append("categoryId", data.categoryId);
    news.append("image", image);
    try {
      let responce = await fetch("http://127.0.0.1:3000/api/news", {
        method: "post",
        body: news,
      });
      responce = await responce.json();
      console.log(responce);
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  function handleChange(e) {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    setData((prev) => {
      return {
        ...prev,
        [inputName]: inputValue,
      };
    });
  }
  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }
  return (
    <>
      <div className="body">
        <div className="login-box">
          <div className="login-header">
            <header>Post-News</header>
          </div>
          <form action="" onSubmit={handlesubmit}>
            <div className="input-box">
              <input
                type="text"
                placeholder="enter-news-title"
                name="title"
                required
                onChange={handleChange}
                className="input-field"
                autoComplete="off"
              ></input>
            </div>
            <div className="input-box">
              <textarea
                placeholder="news-description"
                rows={1}
                name="description"
                onChange={handleChange}
                required
                className="input-field"
                autoComplete="off"
              ></textarea>
            </div>
            <div className="input-box">
              <select
                name="categoryId"
                id=""
                required
                onChange={handleChange}
                className="custom-select"
              >
                <option value="">....select....</option>
                {catData.map((cat) => {
                  return <option value={cat._id}>{cat.name}</option>;
                })}
              </select>
            </div>

            <div className="input-box file-upload">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                id="file-input"
                className="custom-file-input"
              />
              <label htmlFor="file-input" className="custom-file-label">
                Choose an image
              </label>
              {image && <span className="file-name">{image.name}</span>}
            </div>
            <div className="input-submit">
              <button className="submit-btn" id="submit"></button>
              <label htmlFor="submit">Create</label>
            </div>
          </form>
        </div>
      </div>
      {/* <Toaster /> */}
    </>
  );
}

export default CreateNews;
