// src/components/FullArticleEditor.js
import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function FullArticleEditor() {
  const [title, setTitle] = useState('');
  const [paragraphs, setParagraphs] = useState('');
  const [author, setAuthor] = useState('');
  const [citations, setCitations] = useState('');
  const [mediaFilename, setMediaFilename] = useState(''); // Filename
  const [image, setImage] = useState(null);
  const [articleId, setArticleId] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();


 const fetchFullArticle = useCallback(async () => {
        try {
            const response = await api.get(`/fullarticles/${id}`);
            const data = response.data;

            setTitle(data.title || '');
            setParagraphs(data.paragraphs || '');
            setAuthor(data.author || '');
            setCitations(data.citations || '');
            setMediaFilename(data.mediaFilename || ''); // Filename
            setArticleId(data.articleId || '');
        } catch (error) {
            console.error("Error fetching full article:", error);
        }
    }, [api, id]);


    useEffect(() => {
        if (id) {
            fetchFullArticle();
        }
    }, [id, fetchFullArticle]);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]); // Store the File object
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('paragraphs', paragraphs);
        formData.append('author', author);
        formData.append('citations', citations);
        formData.append('articleId', articleId);

        if (image) {
            formData.append('image', image); // Append file
        }

        try {
           const response = id ? await api.put(`/fullarticles/${id}`, formData) : await api.post(`/fullarticles`, formData)
            if (response.status === 200 || response.status === 201){
                console.log('Article saved successfully');
               navigate("/articles");
             } else {
              console.error("Failed to save article")
               }
        } catch (error) {
            console.error('Error saving article:', error);
        }

    };

  return (
        /*It is a must that this code can work on your backend before implementing this section*/
        React.createElement("div", { className: "container" },
        React.createElement("br", null),
        React.createElement("br", null),
        React.createElement("div", { className: "row" },
            React.createElement("div", { className: "col-md-6 offset-md-3" },
                React.createElement("div", { className: "card" },
                    React.createElement("div", { className: "card-header" },
                        React.createElement("h2", { className: "text-center" }, id ? "Update Todo" : "Add Todo")
                    ),
                    React.createElement("div", { className: "card-body" },
                        React.createElement("form", { onSubmit: handleSubmit },
                            React.createElement("div", { className: "form-group mb-2" },
                                React.createElement("label", { className: "form-label" }, "Todo Title:"),
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    placeholder: "Enter Todo Title",
                                    name: "title",
                                    value: title,
                                    onChange: (e) => setTitle(e.target.value),
                                })
                            ),
                            React.createElement("div", { className: "form-group mb-2" },
                                React.createElement("label", { className: "form-label" }, "Todo Description:"),
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    placeholder: "Enter Todo Description",
                                    name: "description",
                                    value: description,
                                    onChange: (e) => setDescription(e.target.value),
                                })
                            ),
                            React.createElement("div", { className: "form-group mb-2" },
                                React.createElement("label", { className: "form-label" }, "Citations:"),
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    placeholder: "Enter Citations",
                                    name: "citations",
                                    value: citations,
                                    onChange: (e) => setCitations(e.target.value),
                                })
                            ),
                           React.createElement("div", { className: "form-group mb-2" },
                                React.createElement("label", { className: "form-label" }, "Article ID:"),
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    placeholder: "Enter Article ID",
                                    name: "articleId",
                                    value: articleId,
                                    onChange: (e) => setArticleId(e.target.value),
                                })
                            ),
                            React.createElement("div", { className: "form-group mb-2" },
                                React.createElement("label", { className: "form-label" }, "Upload Image (Max 5MB):"),
                                React.createElement("input", {
                                    type: "file",
                                    accept: "image/*",
                                    onChange: handleImageChange,
                                })
                            ),
                            React.createElement("button", { className: "btn btn-success", onClick: handleSubmit }, "Submit")
                        )
                    )
                )
            )
        )
    );
}

export default FullArticleEditor;  