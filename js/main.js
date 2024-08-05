console.log('script');

const defaultResume = {
    name: "Karthik SR",
    role: "UX/UI Designer",
    languages: {
        English: 10 ,
        Malayalam: 10,
        Hindi: 7
    },
    experience: {
        firstExperienceItem: {
            date: "Jun. 2023 - Present",
            position: "Marketing Manager",
            info: "Pankayam | Full-time",
            description: [
                {
                    text: "Strategy development and planning of campaigns that promote the business and generate genuine traffic"
                },
                {
                    text: "SEO Content Creation for Blogs, Website, Social media"
                }
            ]
        },
        secondExperienceItem: {
            date: "2017 - Present",
            position: "Graphic / Web designer",
            info: "Freelance",
            description: [
                {
                    text: "Development of internal projects from scratch, product design of brands "
                },
                {
                    text: "Landing page, webapps and hybrid apps"
                },
                {
                    text: "Coordinating with outside agencies, art services, web designer, marketing, printers, and colleagues as necessary."
                }
            ]
        },
        thirdExperienceItem: {
            date: "Sep. 2021 - Jun. 2023",
            position: "Legal Assistant",
            info: "Law Firm | Intern",
            description: [
                {
                    text: "Provide administrative support to lawyer and enhance office effectiveness"
                },
                {
                    text: "Handle communication with clients, witnesses etc."
                },
                {
                    text: "Repare case briefs and summarize depositions, interrogatories and testimony"
                }
            ]
        }
    },
    education: [
        {
            date: "2023",
            name: "UI/UX",
            tags: [
                "UX", "UI", "research", "DesignSystem", "Ui", "wireframing", "figma", "Ux"
            ],
            place: "Coursera"
        },
        {
            date: "2017-2022",
            name: "Law",
            tags: [
                "law", "legalStudies", "contracts", "internationalLaws"
            ],
            place: "University of Kerala"
        },            {
            date: "2017",
            name: "Graphic design",
            tags: [
                "branding", "web", "illustration", "adobe"
            ],
            place: "Coursera"
        }
    ],
    interests: [
        "branding", "design", "photography", "artificial intelligence", "illustration", "typography", "social networks", "research", "dron pilot", "games"
    ],
    goodBye: "Let's chat! I'm ready to work on exciting projects",
    email: "srkarthik.designscape@gmail.com"
}

if (!localStorage.getItem('resume')) {
    localStorage.setItem('resume', JSON.stringify(defaultResume));
}

const resume = JSON.parse(localStorage.getItem('resume'));

renderResume();

function renderResume() {
    renderGreetingBlock();
    renderLanguagesBlock();
    renderExperienceBlock();

    addTextareaListeners();
    addInputListeners();
}


function renderGreetingBlock() {
    const infoElem = document.querySelector('.info__main');

    infoElem.innerHTML = `<textarea class="info__name text-input">${resume.name}</textarea>
                            <textarea class="info__role text-input">${resume.role}</textarea>`;
}

function renderLanguagesBlock() {
    const languagesList = document.querySelector('.languages__list');
    const languagesBarsList = document.querySelector('.languages__bars__list');

    let languages = ``;
    let bars = ``;

    for (let language in resume.languages) {
        languages += `<li class="languages__list__item"><textarea class="language text-input">${language}</textarea></li>`
        bars += `<li class="languages__bars__list__item"><input class="language-range" type="range" name="${language}" min="0" max="10" step="1" value="${resume.languages[language]}"/></li>`
    }

    languagesList.innerHTML = languages;
    languagesBarsList.innerHTML = bars;
}

function renderExperienceBlock() {
    const experience = resume.experience;
    let items = '';
    const keys = Object.keys(experience);

    for (let key of keys) {
        const cur = experience[key];
        items += `<li class="experience__list__item ${key === 'firstExperienceItem' ? 'recent' : ''}">
                        <form class="experience__list__item ${key === 'firstExperienceItem' ? 'recent' : ''}" id="${key}">
                            <textarea class="experience__list__item__date text-input">${cur.date}</textarea>
                            <div class="experience__list__item__content">
                                <div class="position">
                                    <textarea class="position__name text-input">${cur.position}</textarea>
                                    <div class="position-info__container">
                                        <textarea class="position__company text-input">${cur.info}</textarea>
                                    </div>
                                </div>
                                <ul class="position-description__list">
                                </ul>
                            </div>   
                        </form>
                    </li>`
    }

    const experienceList = document.querySelector('.experience__list');
    experienceList.innerHTML = items;

    for (let key of keys) {
        const curForm = experienceList.querySelector(`#${key}`);
        const cur = experience[key];

        const descriptionList = curForm.querySelector('.position-description__list');
        let description = '';
        for (let i = 0; i < cur.description.length; i++) {
            description += `<li class="position-description__list__item">
                                <textarea class="position-description__list__item-input text-input" id="position-${key}-input-${i}"rows="3">${cur.description[i].text}</textarea>
                            </li>`
        }

        descriptionList.innerHTML = description;
    }
}

function addTextareaListeners() {
    const elements = document.querySelectorAll('.text-input');

    for (let element of elements) {
        element.style.height = 0;
        element.style.height = element.scrollHeight + 'px';

        element.addEventListener('input', () => {
            element.style.height = 0;
            element.style.height = element.scrollHeight + 'px';
        })
    }
}

function addInputListeners() {
    document.querySelector('.info__name').addEventListener('change', function(e) {
        localStorage.setItem('resume', JSON.stringify({
            ...resume,
            name: e.target.value
        }));
    });

    document.querySelector('.info__role').addEventListener('change', function(e) {
        localStorage.setItem('resume', JSON.stringify({
            ...resume,
            role: e.target.value
        }));
    });
}

const downloadButton = document.querySelector('.button-download');
downloadButton.addEventListener('click', function() {
    window.print();
})

