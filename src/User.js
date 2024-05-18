import React, { useState } from "react";
import Joyride from "react-joyride";

export const User = () => {
  const [{ run, steps }, setState] = useState({
    run: true,
    steps: [
      {
        content: <h2>Let's begin our journey! Take a tour to know how GovBot works!</h2>,
        locale: { skip: <strong>SKIP</strong> },
        placement: "center",
        target: "body"
      },
      {
        content: <h2>Here is the first step! Sign Up in GovBot.</h2>,
        placement: "top",
        target: "#step-1",
        title: "First step"
      },
      {
        content: <h2>Here is the second step! Login using your credentials.</h2>,
        placement: "top",
        target: "#step-2",
        title: "Second step"
      },
      {
        content: <h2>Here is the third step! Choose a Category of schemes and select a particular scheme from it.</h2>,
        placement: "top",
        target: "#step-3",
        title: "Third step"
      },
      {
        content: <h2>Here is the fourth step! Know the eligibility and benefits of the scheme.</h2>,
        placement: "top",
        target: "#step-4",
        title: "Fourth step"
      },
    ]
  });

  const images = [
    "/images/img3.jpeg",
    "/images/img2.jpeg",
    "/images/img1.jpeg",
    "/images/img4.jpeg"
  ];

  return (
    <div style={{
      background: "orange",
      color: "white",
      height: "100vh",
      overflowY: "scroll",  // Allows scrolling through sections
      scrollSnapType: "y mandatory"  // Enables snapping to sections
    }}>
      <Joyride
        continuous
        callback={() => {}}
        run={run}
        steps={steps}
        hideCloseButton
        scrollToFirstStep
        showSkipButton
        showProgress
        styles={{
            options: {
              overlayColor: 'rgba(0, 0, 0, 0)', // Set overlay color to fully transparent
            },
          }}
      />
      {
        [1, 2, 3, 4].map((item, index) => {
          return (
            <section
              key={item}
              id={`step-${item}`}
              style={{
                border: "1px solid white",
                width: "100%",
                 // Full viewport height
                background: "#00674b",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                textAlign: "center",
                scrollSnapAlign: "start",  // Ensures section snapping
                scrollSnapStop: "always"  // Ensures the snapping stops on this element
              }}
            >
              <img
                src={images[index]}
                alt={`Step ${item}`}
                style={{
                  maxWidth: "50%",  // Adjusted for better fitting within section
                  maxHeight: "70%",  // Adjusted for better fitting within section
                  marginBottom: "8px",
                  borderRadius: "4px"
                }}
              />
              <h2>{`Step ${item}`}</h2>
            </section>
          );
        })
      }
    </div>
  );
}
export default User;