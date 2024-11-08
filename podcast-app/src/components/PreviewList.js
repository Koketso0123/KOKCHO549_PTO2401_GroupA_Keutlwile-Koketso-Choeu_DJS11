// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const PreviewList = () => {
//   const [previews, setPreviews] = useState([]);
//   const [genres, setGenres] = useState([]); // State to store genres

//   // Fetch previews and genres
//   useEffect(() => {
//     const fetchPreviews = async () => {
//       const response = await fetch("https://podcast-api.netlify.app");
//       const data = await response.json();
//       const sortedData = data.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically
//       setPreviews(sortedData);
//     };

//     const fetchGenres = async () => {
//       const response = await fetch("https://podcast-api.netlify.app/genres");
//       const data = await response.json();
//       setGenres(data);
//     };

//     fetchPreviews();
//     fetchGenres();
//   }, []);

//   const formatDate = (dateString) => {
//     if (!dateString) return "Unknown"; // Handle missing or undefined date
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div className="preview-list">
//       {previews.map((preview) => (
//         <div key={preview.id} className="preview-card">
//           <Link to={`/show/${preview.id}`}>
//             {/* Show Image */}
//             {preview.image && (
//               <div className="preview-image">
//                 <img src={preview.image} alt={preview.title} />
//               </div>
//             )}

//             <h3 className="preview-style">{preview.title}</h3>

//             {/* Show number of seasons */}
//             <p>{preview.seasons?.length} Seasons</p>

//             {/* Last updated date */}
//             <p>Last updated: {formatDate(preview.updatedAt)}</p>

//             {/* Display genres */}
//             <div className="genres">
//               {preview.genreIds?.map((genreId) => {
//                 console.log(preview); // Add this inside your map function to inspect the data

//                 const genre = genres.find((g) => g.id === genreId); // Find genre by ID
//                 return genre ? (
//                   <span key={genre.id} className="genre-badge">
//                     {genre.title}
//                   </span>
//                 ) : null; // Handle case where genre is not found
//               })}
//             </div>

//             <p>{preview.description}</p>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PreviewList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PreviewList = () => {
  const [previews, setPreviews] = useState([]);
  const [genres, setGenres] = useState([]); // State to store genres

  // Fetch previews and genres
  useEffect(() => {
    // const fetchPreviews = async () => {
    //   const response = await fetch("https://podcast-api.netlify.app");
    //   const data = await response.json();
    //   console.log("Fetched Previews:", data); // Log the preview data
    //   const sortedData = data.sort((a, b) => a.title.localeCompare(b.title)); // Sort alphabetically
    //   setPreviews(sortedData);
    // };

    // // const fetchGenres = async () => {
    // //   const response = await fetch("https://podcast-api.netlify.app/genres");
    // //   const data = await response.json();
    // //   console.log("Fetched Genres:", data); // Log the genre data
    // //   setGenres(data);
    // // };
    // const fetchGenres = async () => {
    //   const response = await fetch("https://podcast-api.netlify.app/genres"); // Fixed URL to just "genres"
    //   const data = await response.json();
    //   console.log("Fetched Genres:", data); // Log the genre data
    //   setGenres(data);
    // };
    const fetchPreviews = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app");
        if (!response.ok) {
          throw new Error("Failed to fetch previews");
        }
        const data = await response.json();
        console.log("Fetched Previews:", data);
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setPreviews(sortedData);
      } catch (error) {
        console.error("Error fetching previews:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch("https://podcast-api.netlify.app/genres");
        // ;
        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }
        const data = await response.json();
        console.log("Fetched Genres:", data);
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchPreviews();
    fetchGenres();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown"; // Handle missing or undefined date
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="preview-list">
      {previews.map((preview) => {
        console.log("Preview Data:", preview); // Log each preview item for debugging
        return (
          <div key={preview.id} className="preview-card">
            <Link to={`/show/${preview.id}`}>
              {/* Show Image */}
              {preview.image && (
                <div className="preview-image">
                  <img src={preview.image} alt={preview.title} />
                </div>
              )}
              <h3 className="preview-style">{preview.title}</h3>
              {/* Show number of seasons
              <p>
                {preview.seasons && preview.seasons.length > 0
                  ? `${preview.seasons.length} Seasons`
                  : "No Seasons Available"}
              </p> */}
              {/* // Show number of seasons */}
              <p>{preview.seasons} Seasons</p>

              {/* Last updated date */}
              <p>Last updated: {formatDate(preview.updatedAt)}</p>
              {/* Display genres */}
              <div className="genres">
                {preview.genreIds && preview.genreIds.length > 0 ? (
                  preview.genreIds.map((genreId) => {
                    const genre = genres.find((g) => g.id === genreId); // Find genre by ID
                    return genre ? (
                      <span key={genre.id} className="genre-badge">
                        {genre.title}
                      </span>
                    ) : null; // Handle case where genre is not found
                  })
                ) : (
                  <span>No genres available</span>
                )}
              </div>
              <p>{preview.description}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PreviewList;
