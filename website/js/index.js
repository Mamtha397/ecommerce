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
        displayProductItems();
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
      let newHTML = '';
      for(let i=0;i<resultJson.data.length;i++){
        newHTML +=
          ` 
                      <div class="product category__products">
                        <div class="product__header">
                          <img src=${resultJson.data[i]} alt="product">
                        </div>
                        <div class="product__footer">
                          <h3>${product.title}</h3>
                          <div class="rating">
                            <svg>
                              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                            </svg>
                            <svg>
                              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                            </svg>
                            <svg>
                              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                            </svg>
                            <svg>
                              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
                            </svg>
                            <svg>
                              <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
                            </svg>
                          </div>
                          <div class="product__price">
                            <h4>$${product.price}</h4>
                          </div>
                          <a href="#"><button type="submit" class="product__btn">Add To Cart</button></a>
                        </div>
                      <ul>
                          <li>
                            <a data-tip="Quick View" data-place="left" href="#">
                              <svg>
                                <use xlink:href="./images/sprite.svg#icon-eye"></use>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a data-tip="Add To Wishlist" data-place="left" href="#">
                              <svg>
                                <use xlink:href="./images/sprite.svg#icon-heart-o"></use>
                              </svg>
                            </a>
                          </li>
                          <li>
                            <a data-tip="Add To Compare" data-place="left" href="#">
                              <svg>
                                <use xlink:href="./images/sprite.svg#icon-loop2"></use>
                              </svg>
                            </a>
                          </li>
                      </ul>
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
  
