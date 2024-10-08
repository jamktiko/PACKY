![packy3d2](https://github.com/user-attachments/assets/198989fa-e076-42f4-9424-e1c1df047f0a) 
# PACKY - Tech Consult App
### Developed by team **PACKY** | **A TiCorporate project** of fall 2024 | **JAMK** 


## Meet our team
- [**Severi Boesen**](https://boesen.netlify.app/)       - *Product Owner, UI/UX Designer, Software Architect* - AD1871@student.jamk.fi
- **Petri Paasila**       - *Stage Management, Lead Developer*  -  AD1782@student.jamk.fi
- **Matias Juvonen**      - *Testing lead, Developer*  -  AD2069@student.jamk.fi
- **Arttu Henriksson**    - *Firebase Specialist, Developer, SCRUM Master*  -  AD1820@student.jamk.fi
- **Aatu Mäenpää**        - *Business Manager, Developer*  -  AD1741@student.jamk.fi

## About PACKY
> PACKY is designed with starting developers in mind. The idea was born out of a need we and our peer students had when we first started to learn web development.
> For many, understanding and tackling the scale of an application may seem like something unattainable at first; this is where PACKY comes in.

PACKY is a web application that provides tools to help developers finding and realizing the technologies necessary for their own applications. The main feature of PACKY is the `Stack Builder` tool, which gives the user the ability to plan out their required technologies and gives them a list of suggestions and details regarding their chosen features. In addition, it has a curated library of technologies that can be expanded upon further research - the scope and possibilities are as vast as are the amount of technologies out there. While the field of development is constantly changing, PACKY strives to stay focused in strong technological foundations while looking out for newer possibilities. 

The app itself requires authentication keys in order to be used. These keys are sold for organizations for primarily educational and secondarily quality-of-life purposes. For example, someone with no earlier experience in planning out required technologies or understanding the scope of a developmental product can use PACKY to gain perspective on what truly is required. PACKY also offers a method for communication, since the end product itself is a list of suggested technologies - carefully chosen for cross functionality and ease. Planning and designing apps could ease up by a major factor.

## Technological overview
PACKY is a **React | Next.JS web application** that uses **Redux** for stage management **Tailwind CSS** for styling. The database is hosted by and located in **Neo4J**.

The developmental branch of the application repository is the src folder. It has:
- **assets**
- **components**
- **hooks**
- **pages**
- **reducers**
- **store**
- **utils**

Each of these folders may have subfolders for better organization. 
All data is brought to pages, which in turn displays everything.
Some image assets are in root folder public instead of assets for ease of use.

## Basic Git commands
Initialize local repo:
```
git init
git remote add origin https://github.com/jamktiko/PACKY.git
git pull origin main
npm i
```

Run the project:
```
npm run dev
```

Update repo:
```
git add .
git commit -m [message]
git push origin main
```
