/*
=============
Navigation
=============
 */
const navOpen = document.querySelector(".nav__hamburger");
const navClose = document.querySelector(".close__toggle");
const menu = document.querySelector(".nav__menu");
const scrollLink = document.querySelectorAll(".scroll-link");
const navContainer = document.querySelector(".nav__menu");

navOpen.addEventListener("click", () => {
  menu.classList.add("open");
  document.body.classList.add("active");
  navContainer.style.left = "0";
  navContainer.style.width = "30rem";
});

navClose.addEventListener("click", () => {
  menu.classList.remove("open");
  document.body.classList.remove("active");
  navContainer.style.left = "-30rem";
  navContainer.style.width = "0";
});

/*
=============
PopUp
=============
 */
const popup = document.querySelector(".popup");
const closePopup = document.querySelector(".popup__close");

if (popup) {
  closePopup.addEventListener("click", () => {
    popup.classList.add("hide__popup");
  });

  window.addEventListener("load", () => {
    setTimeout(() => {
      popup.classList.remove("hide__popup");
    }, 500);
  });
}

/*
=============
Fixed Navigation
=============
 */

const navBar = document.querySelector(".navigation");
const gotoTop = document.querySelector(".goto-top");

// Smooth Scroll
Array.from(scrollLink).map(link => {
  link.addEventListener("click", e => {
    // Prevent Default
    e.preventDefault();

    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navBar.getBoundingClientRect().height;
    const fixNav = navBar.classList.contains("fix__nav");
    let position = element.offsetTop - navHeight;

    if (!fixNav) {
      position = position - navHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
    navContainer.style.left = "-30rem";
    document.body.classList.remove("active");
  });
});

// Fix NavBar

window.addEventListener("scroll", e => {
  const scrollHeight = window.pageYOffset;
  const navHeight = navBar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
    navBar.classList.add("fix__nav");
  } else {
    navBar.classList.remove("fix__nav");
  }
  
  if (scrollHeight > 300) {
    gotoTop.classList.add("show-top");
  } else {
    gotoTop.classList.remove("show-top");
  }
});

getImageCarousal();

function getImageCarousal(){
  let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var resultJson = JSON.parse(this.responseText);
        for(let i=0;i<resultJson.data.length;i++){
          document.getElementsByClassName("banner_01")[i+1].src = resultJson.data[i];
        }
        getOfferProduct();
      }
    };
    xhttp.open("GET", "http://localhost:5000/api/v1/home/imageCarousal", true);
    xhttp.send();
}

function getOfferProduct(){
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var resultJson = JSON.parse(this.responseText);
      let j=4
      for(let i=0;i<resultJson.data.length;i++){
        document.getElementsByClassName("offerImage")[j].src = resultJson.data[i][2];
        document.getElementsByClassName("offerName")[j].innerText = resultJson.data[i][1];
        document.getElementsByClassName("offerCutPrice")[j].innerText = "$" + resultJson.data[i][3];
        document.getElementsByClassName("offerPrice")[j++].innerHTML = "$" +resultJson.data[i][4];
      }
      displayProductItems();
    }
  };
  xhttp.open("GET", "http://localhost:5000/api/v1/home/offer", true);
  xhttp.send();
}

const categoryCenter = document.querySelector(".category__center");

const displayProductItems = () => {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var resultJson = JSON.parse(this.responseText);
      console.log(resultJson,"resultJson")
      let newHTML = '';
      for(let i=0;i<resultJson.data.length;i++){
        newHTML +=
          ` 
                      <div class="product category__products">
                        <div class="product__header">
                          <img src=${resultJson.data[i][2]} alt="product">
                        </div>
                        <div class="product__footer">
                          <h3>${resultJson.data[i][1]}</h3>
                        </div>
                      </div>
                      `
        }
        if (categoryCenter) {
          categoryCenter.innerHTML = newHTML;
        }
    }
  };
  xhttp.open("GET", "http://localhost:5000/api/v1/home/category", true);
  xhttp.send();
};

function onCartClick(product_id){
  let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var resultJson = JSON.parse(this.responseText);
            console.log(resultJson,"resultJson")
            localStorage.setItem(product_id,`${resultJson.data[0][1]}|${resultJson.data[0][2]}|${resultJson.data[0][4]}`);
            }
        };
        xhttp.open("GET", `http://localhost:5000/api/v1/category/getProduct?product=${product_id}`, true);
        xhttp.send();
}