// function locomotivecode(){
//     gsap.registerPlugin(ScrollTrigger);


// // Using Locomotive Scroll

// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector(".main"),
//   smooth: true
// });
// // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
// locoScroll.on("scroll", ScrollTrigger.update);

// // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
// ScrollTrigger.scrollerProxy(".main", {
//   scrollTop(value) {
//     return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
//   }, // we don't have to define a scrollLeft because we're only scrolling vertically.
//   getBoundingClientRect() {
//     return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//   }
// });






// // GSAP PARALLAX - INDIVIDUAL ELEMENTS (while sharing class)

// // get sections
// var parallaxElements = Array.prototype.slice.call(document.querySelectorAll("section"));
// var self = this;
	
// // get box or parallax element inside each section
//   parallaxElements.forEach(function(self) {
	  
//     var boxTop = self.querySelectorAll(".parallaxTop");
//     var box = self.querySelectorAll(".parallax");
    
//     // animate boxes at top of page (section already in viewport)
//     gsap.to(boxTop, {
//       scrollTrigger: {
//         scroller: ".main",
//         scrub: true, 
//         trigger: self, 
//         start: "top 0%", 
//         end: "bottom 0%", 
//       }, 
//       y: (i, target) => -innerHeight * target.dataset.speed,
//       ease: "none"
//     });
    
//     // animate boxes when the relevant section comes into viewport
//     gsap.to(box, {
//       scrollTrigger: {
//         scroller: ".main",
//         scrub: true, 
//         trigger: self, 
//         start: "top 100%", 
//         end: "bottom 0%", 
//       }, 
//       y: (i, target) => -innerHeight * target.dataset.speed,
//       ease: "none"
//     });
    
    
// });



// ////////////////////////////////////

// // get pinned boxes and box width
// var pinBoxes = $('.pin-box');
// var pinBoxWidth = pinBoxes.width();

// // screen width 100vw equivalent
// var windowWidth = $(window).innerWidth();

// // get pin box wrpper and calc width based on window width X number of boxes
// var pinWrap = $('.pin-wrap');
// var pinWrapWidth = windowWidth * pinBoxes.length;

// var horizontalScrollLength = (pinBoxes.length - 1) * windowWidth;

// // give pin wrap a set width
// $('.pin-wrap').width(pinWrapWidth);



// console.log('pin box width', pinBoxWidth);
// console.log('pin wrap total width', pinWrapWidth);
// console.log('horizontal scroll', horizontalScrollLength);


// // Pinning and horizontal scrolling

// gsap.to(".pin-wrap", {
//   scrollTrigger: {
//     scroller: ".main",
//     scrub: true,
//     trigger: "#sectionPin",
//     pin: "#sectionPin",
//     // anticipatePin: 1,
//     start: "top top",
//     end: pinWrapWidth
//   }, 
//   x: -horizontalScrollLength,
//   ease: "none"
// });





// ////////////////////////////////////


// //other animations
// gsap.to("#box5", {
//   scrollTrigger: {
//     scroller: ".main",
//     scrub: true,
//     trigger: "#box5",
//     start: "top bottom",
//     end: "bottom top"
//   }, 
//   x: 500,
//   ease: "none"
// });


// //timeline test
// var tl = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#section3",
//       scroller: ".main",
//       // scrub: true,
//       start: "top 50%",
//       // end: "+=100%",
//       // markers: true,
//       // id: "text panel"
//     }
//   });

// tl.from("#box7", {scale: 0.3, x: "-100%", autoAlpha: 0})
//   .from("#box8", {autoAlpha: 0, ease: "power2"})
// // .to("#box7", {scale: 1.2, ease: "bounce"})


// //toggle test
// gsap.from("#box9", {
//   scrollTrigger: {
//     trigger: "#section4",
//     scroller: ".main",
//     toggleActions: "restart none none none",
//     start: "top top",
//     id: "bottom panel"
//     // end: "top top"
//   }, 
//   rotation: 360,
//   ease: "none"
// });





// // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
// ScrollTrigger.refresh();

// }
// locomotivecode()

function locomotivecode() {
  // Register GSAP plugin
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Locomotive Scroll
  const scrollContainer = document.querySelector(".main");

  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    multiplier: 1.2 // makes it a little faster
  });

  // Sync ScrollTrigger with Locomotive
  locoScroll.on("scroll", ScrollTrigger.update);

  // ScrollTrigger proxy setup
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed",
  });

  // Animation Example 1: Page 1 Text
  // gsap.from("#page1 h1", {
  //   scrollTrigger: {
  //     trigger: "#page1 h1",
  //     scroller: ".main",
  //     start: "top 80%",
  //     end: "top 30%",
  //     scrub: true,
  //   },
  //   y: 100,
  //   opacity: 0,
  //   duration: 1,
  //   ease: "power3.out"
  // });

  // Animation Example 2: Images on Page 2
  gsap.utils.toArray(".img").forEach((img, i) => {
    gsap.from(img, {
      scrollTrigger: {
        trigger: img,
        scroller: ".main",
        start: "top 90%",
        end: "top 30%",
        scrub: true,
      },
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out"
    });
  });

  // Animation Example 3: Children on Page 3
  gsap.utils.toArray(".child").forEach((child) => {
    gsap.from(child, {
      scrollTrigger: {
        trigger: child,
        scroller: ".main",
        start: "top 90%",
        end: "top 30%",
        scrub: true,
      },
      y: 100,
      scale: 0.9,
      opacity: 0,
      duration: 1
    });
  });

  // Refresh on resize & after setup
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}

// Run it after DOM is loaded

  locomotivecode();


gsap.to('.navpart1 svg',{
  transform:"translateY(-100%)",
  scrollTrigger:{
    trigger:"#page1",
    scroller:".main",
    start:"top 0",
    end:"top -5%",
    scrub:true
  }
})

gsap.to(".navpart2 .links",{
  transform:"translateY(-100)",
  opacity:0,
  scrollTrigger:{
    trigger:"#page1",
    scroller:".main",
    start:"top 0",
    end:"top -5%",
    scrub:true
  }
})

const playbtn=document.querySelector('.play')
const videocont=document.querySelector('.video_container')

function videoanimation(){
    videocont.addEventListener('mouseenter',()=>{
        gsap.to(playbtn,{
            opacity: 1,
            scale: 1
        })
    })
    
    videocont.addEventListener('mouseleave',()=>{
        gsap.to(playbtn,{
            opacity: 0,
            scale: 0
        })
    })
    
    videocont.addEventListener('mousemove',(dets)=>{
        gsap.to(playbtn,{
            left:dets.x-50,
            top:dets.y-50,
            
        })
    })
}
videoanimation()

function pageanimation(){
    gsap.from("#page1 h1",{
    opacity:0,
    y:100,
    delay:0.5,
    duration:0.5,
    stagger:0.2
})

gsap.from("#page1 .video_container",{
    scale:0.9,
    opacity:0,
    y:100,
    delay:0.3,
    duration:1,
})
}
pageanimation()


function cursor(){
    document.addEventListener('mousemove',(dets)=>{
        gsap.to("#cursor",{
            left:dets.x,
            top:dets.y,
            
        })
    })

document.querySelectorAll('.child').forEach(function (elem){
    elem.addEventListener("mouseenter",function(){
        gsap.to('#cursor',{
            transform:"translate(-50%,-50%) scale(1)",
        });
    });
    elem.addEventListener("mouseleave",function(){
        gsap.to('#cursor',{
            transform:"translate(-50%,-50%) scale(0)",
        });
    });
});
}
cursor()


function horizontalLine(){
gsap.to(".footer .line", {
  width: "100%",
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".footer",
    scroller: ".main",
    start: "top 90%",
    toggleActions: "play none none reverse"
  }
});

gsap.from(".text_area .hl", {
  width: "0%",
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".text_area",
    scroller: ".main",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});
}
horizontalLine()














