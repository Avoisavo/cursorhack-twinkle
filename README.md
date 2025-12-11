# Twinkle

## Background of the Story
The last time I worked, I was a part-time teacher at a primary school where I had the chance to teach students with ADHD. I realized something strange: these kids are actually very curious about their surroundings and the material I taught. Yet, they still suffered from poor school performance, were bullied by friends, and often ate lunch alone.

I started to ask my colleagues about this and discovered some shocking realities:
1.  **Mental Health Crisis**: Many kids suffer deeply, and some even commit suicide, because they cannot stand the stress of not being understood by their parents and the consistent bullying from peers.
2.  **Systemic Gaps**: The childhood education system in Malaysia is not yet fully matured regarding special needs. Teachers often deliver the same material to ADHD students as they do to neurotypical students. This mismatch causes ADHD kids to lose willingness to learn, get distracted, and feel fundamentally misunderstood.

## Problem Statement
The current educational landscape fails to accommodate the unique needs of ADHD students.
-   **One-Size-Fits-All Approach**: Delivering standard material to ADHD students leads to disengagement and frustration.
-   **Lack of Specialized Tools**: Existing platforms like Duolingo are designed for general learning but are not tailored for "special kids" who need different engagement strategies.
-   **Social & Emotional Toll**: The lack of support leads to severe isolation, bullying, and mental health struggles.

## Solution
We realized that to help these kids, we need to give them what they actually need: **interesting learning materials**, a **clean environment** to minimize distraction, and **multi-sensory** engagement.

**Twinkle** is our answer. We have gamified the learning experience specifically for ADHD kids (and any kid who struggles with traditional methods).

-   **Gamified Platform**: Unlike standard apps, we turn learning into an immersive game to capture and hold attention.
-   **Tailored Environment**: Designed to be engaging without being overwhelming, providing the right balance of stimulation.
-   **Mission**: To save ADHD kids in Malaysia and all around the world by restoring their love for learning and their confidence.

## Architecture
The application follows a modern client-server architecture:


1.  **Frontend**: Built with **Next.js**, utilizing **React Three Fiber** for rendering the 3D game world and **Tailwind CSS** for the responsive UI.
2.  **Backend**: A lightweight **Express.js** server that handles API requests.
3.  **AI Layer**: The backend proxies requests to the **Anthropic API**, ensuring secure key management and enabling advanced natural language processing.

## Tech Stack

### Frontend
-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **3D Engine**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
-   **Helpers**: [@react-three/drei](https://github.com/pmndrs/drei) (for clouds, text, controls)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend
-   **Runtime**: Node.js
-   **Server**: Express.js
-   **AI Model**: Anthropic Claude 3.5 Sonnet (`@anthropic-ai/sdk`)


