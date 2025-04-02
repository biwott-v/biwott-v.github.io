document.addEventListener("DOMContentLoaded", () => {
  //brigtness
  const background = document.body;
  const brightness = document.querySelector("#brightnessImage");
  if (brightness) {
      brightness.addEventListener("click", () => {
          const isDark = brightness.src.includes("moon-stars-fill");
          brightness.src = isDark ? 
              "components/brightness-high-fill.png" : 
              "components/moon-stars-fill.png";
          background.style.backgroundColor = isDark ? "#e4edf4" : "#10131c";
          background.style.color = isDark ? "#10131c" : "#e4edf4";
      });
  }
  const main = document.querySelector("#main");
  let showAll = false;
  let eventsData = [];
  const cardsPerPage = 6;

  main.style.display = "grid";
  main.style.gridTemplateColumns = "repeat(2, 1fr)";
  main.style.gap = "2rem";
  main.style.padding = "2rem";

  const popup = document.createElement("div");
  popup.style.cssText = "position:fixed;display:none;z-index:100;";
  document.body.appendChild(popup);

  function handleHover(event) {
      if (event.target.tagName === "IMG") {
          popup.style.display = "block";
          popup.style.left = `${e.pageX + 15}px`;
          popup.style.top = `${e.pageY + 15}px`;
          popup.innerHTML = `<img src="${e.target.src}" style="max-width:300px;">`;
      }
  }

  function hidePopup() {
      popup.style.display = "none";
  }
//Displays the cards 
  function renderCards() {
      main.innerHTML = "";
      const cards = showAll ? eventsData.events : eventsData.events.slice(0, cardsPerPage);
      
      cards.forEach((event, i) => {
          const card = document.createElement("div");
          card.className = "box";
          card.innerHTML = `
              <img src="${eventsData.images[i]}" 
                   alt="${event}" 
                   height=130px,width=261px;">
              <p>${event}</p>
          `;
          card.querySelector("img").addEventListener("mouseover", handleHover);
          card.querySelector("img").addEventListener("mouseout", hidePopup);
          main.appendChild(card);
      });
  }
//The more less button
  function createToggleButton() {
      const btn = document.createElement("button");
      btn.id = "loadMore";
      btn.textContent = "More";
      btn.style.cssText = `
          display: block;
          margin: 2rem auto;
          padding: 0.8rem 2rem;
          background: #4d8fc8;
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
      `;
      
      btn.addEventListener("click", () => {
          showAll = !showAll;
          btn.textContent = showAll ? "Less" : "More";
          renderCards();
      });
      
      document.querySelector("section").appendChild(btn);
  }

  fetch("www.chess.com.json")
      .then(response => response.json())
      .then(data => {
          eventsData = data;
          renderCards();
          createToggleButton();
      })
      .catch(error => {
          console.error("Error loading data:", error);
          main.innerHTML = `<p class="error">Failed to load events. Please refresh the page.</p>`;
      });
});
