const loadCategory = async () => {
  const res = await fetch(
    "https://newsdata.io/api/1/sources?country=bd&apikey=pub_55664120963394010ff7d91bc73d25d8e3cde"
  );
  const data = await res.json();
  navbar(data.results[0].category);
};

function navbar(categories) {
  const dropdown = document.getElementById("dropdown-list");
  const navContainer = document.getElementById("nav-item");

  categories.forEach((category) => {
    const navItem = document.createElement("li");
    navItem.innerHTML = `<a onclick="loadNewsbyCategory('${category}')" class="hover:text-blue-900 hover:font-bold">${category}</a>`;
    navContainer.appendChild(navItem);

    const dropItem = document.createElement("li");
    dropItem.innerHTML = `<a onclick="loadNewsbyCategory('${category}')" class="hover:text-blue-900 hover:font-bold">${category}</a>`;
    dropdown.appendChild(dropItem);
  });
}

// function loadNewsbyCategory(data) {
//   console.log(data);
// }

// const loadNewsbyCategory = async (id) => {
//   const res = await fetch(
//     `https://newsdata.io/api/1/latest?country=bd&category=${id}&apikey=pub_55664120963394010ff7d91bc73d25d8e3cde`
//   );
//   const data = await res.json();
//   content(data.results);
// };

// function content(items) {
//   console.log(items);
//   const newsContainer = document.getElementById("news-item");
//   items.forEach((item) => {
//     console.log(item);
//     const newsItem = document.createElement("div");
//     newsItem.innerHTML = `<div
//           class="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-lg   sm:flex-row"
//         >
//         <div class="sm:ml-4 mt-4 sm:mt-0">
//           <img
//             src="${item.image_url}"
//             alt="Sam Curran"
//             class="w-full h-auto rounded-lg object-cover"
//           />
//         </div>
//           <div class="flex flex-col">
//             <h2 class="text-lg font-bold text-gray-800 hover:text-blue-800 cursor-pointer"
//             onclick=modal.showModal()>
//               ${item.title}
//             </h2>
//             <p class="mt-2 text-gray-600">
//               ${item.description}
//             </p>
//             <p class="mt-2 text-sm text-gray-500">৫ ঘণ্টা আগে</p>
//           </div>
//         </div>`;
//     newsContainer.prepend(newsItem);
//     const modalContainer = document.getElementById("modal");
//     modalContainer.innerHTML = `
//   <dialog id="my_modal_3" class="modal">
//     <div class="modal-box">
//       <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md ">

//             <img class="w-full h-56 object-cover" src="${
//               item.image_url
//             }" alt="Pet Image">

//             <div class="p-6">
//                 <h2 class="text-2xl font-semibold mb-2">${item.title}</h2>

//                 <div class="grid grid-cols-1 gap-4 text-sm text-gray-600">
//                     <div class="flex items-center space-x-2">
//                         <span>Description ${
//                           item.description ? `${item.description}` : "N/A"
//                         }</span>
//                     </div>
//                     <div class="flex items-center space-x-2">
//                         <span>Video: ${
//                           item.video_url ? `${item.video_url}` : "N/A"
//                         }</span>
//                     </div>
//                     <div class="flex items-center space-x-2">
//                         <i class="fa-solid fa-venus"></i>
//                         <span>Category: ${
//                           item.category ? `${item.category}` : "N/A"
//                         }</span>
//                         </div>
//                         <div class="flex items-center space-x-2">
//                             <span>Source ${
//                               item.source_name ? `${item.source_name}` : "N / A"
//                             }: ${item.link}</span>
//                         </div>
//                         <div class="flex items-center space-x-2">
//                             <span>Published Date: ${item.pubDate}$</span>
//                         </div>
//                 </div>
//             </div>

//             <div class="modal-action">
//                 <form method="dialog">
//                     <div class="p-6 bg-gray-50 flex justify-center">
//                     <button class="btn btn-outline  text-cyan-600 hover:bg-[rgba(14,122,129,0.5)] hover:text-black px-4 py-2 rounded-lg font-semibold">
//                         Cancel
//                     </button>
//                     </div>
//                 </form>
//             </div>
//         </div>

//     </div>
//   </dialog>;
//   `;
//     my_modal_3.showModal();
//   });
// }

loadCategory();

const loadNewsbyCategory = async (id) => {
  const res = await fetch(
    `https://newsdata.io/api/1/latest?country=bd&category=${id}&apikey=pub_55664120963394010ff7d91bc73d25d8e3cde`
  );
  const data = await res.json();
  content(data.results);
};

function content(items) {
  const newsContainer = document.getElementById("news-item");
  const modalContainer = document.getElementById("modal");

  // Clear previous news items
  newsContainer.innerHTML = "";

  items.forEach((item) => {
    const newsItem = document.createElement("div");
    console.log(item);
    newsItem.innerHTML = `
        <div class="w-full mx-auto grid grid-cols-2 gap-6 p-6 bg-white sm:grid-cols-1 sm:w-full mb-6">
          <div class="w-full col-span-1 p-6 bg-white rounded-lg shadow-lg sm:w-full mb-6">
            <div class="sm:flex sm:items-start">
              <div class="sm:w-1/3">
                <img
                  src="${item.image_url}"
                  alt="${item.title}"
                  class="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div class="sm:w-2/3 sm:ml-6 mt-4 sm:mt-0">
                <h2 class="text-xl font-bold text-gray-800 hover:text-blue-800 cursor-pointer">
                  ${item.title}
                </h2>
                <p class="mt-2 text-gray-600">${item.description}</p>
                <p class="mt-4 text-sm text-gray-500">Published Date: ${item.pubDate}</p>
                <p class="mt-4 text-sm text-blue-500">Source: ${item.source_name}</p>
              </div>
            </div>
          </div>
        </div>

      `;
    newsContainer.prepend(newsItem);

    // Add click event to the title to show modal with content details
    const titleElement = newsItem.querySelector("h2");
    titleElement.addEventListener("click", () => {
      modalContainer.innerHTML = `
          <dialog id="my_modal_3" class="modal">
            <div class="modal-box">
              <div class="max-w-sm mx-auto bg-white rounded-lg shadow-md">
                <img class="w-full h-56 object-cover" src="${item.image_url}" alt="Pet Image">
                <div class="p-6">
                  <h2 class="text-2xl font-semibold mb-2">${item.title}</h2>
                  <div class="grid grid-cols-1 gap-4 text-sm text-gray-600">
                    <div class="flex items-center space-x-2">
                      <span>Description: ${item.description}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span>Video: ${item.video_url}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span>Category: ${item.category}</span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span>Source: ${item.source_name} - <a href="${item.link}" target="_blank">${item.link}</a></span>
                    </div>
                    <div class="flex items-center space-x-2">
                      <span>Published Date: ${item.pubDate}</span>
                    </div>
                  </div>
                </div>
                <div class="modal-action">
                  <form method="dialog">
                    <button class="btn btn-outline text-cyan-600 hover:bg-[rgba(14,122,129,0.5)] hover:text-black px-4 py-2 rounded-lg font-semibold">
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </dialog>
        `;

      const myModal = document.getElementById("my_modal_3");
      if (myModal) {
        myModal.showModal();
      }
    });
  });
}
