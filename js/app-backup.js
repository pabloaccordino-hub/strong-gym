/* =========================================================
   STRONG GYM
   APP.JS
   Navegación + Perfil + Temporizador + Búsqueda
   ========================================================= */


/* =========================================================
   DATOS DEL PERFIL
   ========================================================= */

const PROFILE_STORAGE_KEY = "strongGymProfile";


let profile = {

    name: "",

    age: "",

    sex: "",

    height: "",

    weight: "",

    level: "",

    goal: "",

    days: "",

    time: ""

};



/* =========================================================
   CARGAR PERFIL DESDE EL DISPOSITIVO
   ========================================================= */

function loadProfile() {

    try {

        const savedProfile =
            localStorage.getItem(
                PROFILE_STORAGE_KEY
            );


        if (!savedProfile) {

            return;

        }


        const parsedProfile =
            JSON.parse(savedProfile);


        if (
            parsedProfile &&
            typeof parsedProfile === "object"
        ) {

            profile = {
                ...profile,
                ...parsedProfile
            };

        }


    } catch (error) {

        console.error(
            "No se pudo cargar el perfil:",
            error
        );

    }

}



/* =========================================================
   GUARDAR PERFIL
   ========================================================= */

function saveProfile() {

    try {

        localStorage.setItem(
            PROFILE_STORAGE_KEY,
            JSON.stringify(profile)
        );


        showProfileSavedMessage();


        updateWelcomeUser();


    } catch (error) {

        console.error(
            "No se pudo guardar el perfil:",
            error
        );


        alert(
            "No se pudo guardar el perfil en este dispositivo."
        );

    }

}



/* =========================================================
   OBTENER DATOS DEL FORMULARIO
   ========================================================= */

function readProfileForm() {

    const name =
        document.getElementById(
            "profileName"
        );


    const age =
        document.getElementById(
            "profileAge"
        );


    const sex =
        document.getElementById(
            "profileSex"
        );


    const height =
        document.getElementById(
            "profileHeight"
        );


    const weight =
        document.getElementById(
            "profileWeight"
        );


    const days =
        document.getElementById(
            "profileDays"
        );


    const time =
        document.getElementById(
            "profileTime"
        );


    profile.name =
        name
            ? name.value.trim()
            : "";


    profile.age =
        age
            ? age.value
            : "";


    profile.sex =
        sex
            ? sex.value
            : "";


    profile.height =
        height
            ? height.value
            : "";


    profile.weight =
        weight
            ? weight.value
            : "";


    profile.days =
        days
            ? days.value
            : "";


    profile.time =
        time
            ? time.value
            : "";


    const selectedLevel =
        document.querySelector(
            ".option-card.selected[data-profile-level]"
        );


    const selectedGoal =
        document.querySelector(
            ".option-card.selected[data-profile-goal]"
        );


    profile.level =
        selectedLevel
            ? selectedLevel.dataset.profileLevel
            : profile.level;


    profile.goal =
        selectedGoal
            ? selectedGoal.dataset.profileGoal
            : profile.goal;

}



/* =========================================================
   MOSTRAR PERFIL EN EL FORMULARIO
   ========================================================= */

function populateProfileForm() {

    const name =
        document.getElementById(
            "profileName"
        );


    const age =
        document.getElementById(
            "profileAge"
        );


    const sex =
        document.getElementById(
            "profileSex"
        );


    const height =
        document.getElementById(
            "profileHeight"
        );


    const weight =
        document.getElementById(
            "profileWeight"
        );


    const days =
        document.getElementById(
            "profileDays"
        );


    const time =
        document.getElementById(
            "profileTime"
        );


    if (name) {

        name.value =
            profile.name || "";

    }


    if (age) {

        age.value =
            profile.age || "";

    }


    if (sex) {

        sex.value =
            profile.sex || "";

    }


    if (height) {

        height.value =
            profile.height || "";

    }


    if (weight) {

        weight.value =
            profile.weight || "";

    }


    if (days) {

        days.value =
            profile.days || "";

    }


    if (time) {

        time.value =
            profile.time || "";

    }


    /*
     * Nivel
     */

    document
        .querySelectorAll(
            "[data-profile-level]"
        )
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.profileLevel
                    === profile.level
            );

        });


    /*
     * Objetivo
     */

    document
        .querySelectorAll(
            "[data-profile-goal]"
        )
        .forEach(button => {

            button.classList.toggle(
                "selected",
                button.dataset.profileGoal
                    === profile.goal
            );

        });

}



/* =========================================================
   MENSAJE DE PERFIL GUARDADO
   ========================================================= */

function showProfileSavedMessage() {

    const message =
        document.getElementById(
            "profileSavedMessage"
        );


    if (!message) {

        return;

    }


    message.classList.add("show");


    setTimeout(() => {

        message.classList.remove("show");

    }, 3000);

}



/* =========================================================
   ACTUALIZAR BIENVENIDA
   ========================================================= */

function updateWelcomeUser() {

    const title =
        document.querySelector(
            ".welcome-card h2"
        );


    if (!title) {

        return;

    }


    if (profile.name) {

        title.textContent =
            `¡Hola, ${profile.name}!`;

    } else {

        title.textContent =
            "¿Listo para entrenar?";

    }

}



/* =========================================================
   NAVEGACIÓN
   ========================================================= */

const navigationButtons =
    document.querySelectorAll(
        ".nav-button[data-section]"
    );


const quickButtons =
    document.querySelectorAll(
        ".quick-card[data-section]"
    );


const sections =
    document.querySelectorAll(
        ".app-section"
    );



function showSection(sectionId) {

    sections.forEach(section => {

        section.classList.remove(
            "active"
        );

    });


    const selectedSection =
        document.getElementById(
            sectionId
        );


    if (!selectedSection) {

        return;

    }


    selectedSection.classList.add(
        "active"
    );


    navigationButtons.forEach(
        button => {

            button.classList.remove(
                "active"
            );


            if (
                button.dataset.section
                === sectionId
            ) {

                button.classList.add(
                    "active"
                );

            }

        }
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



/* Navegación inferior */

navigationButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.section
                );

            }
        );

    }
);



/* Accesos rápidos */

quickButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                showSection(
                    button.dataset.section
                );

            }
        );

    }
);



/* =========================================================
   PERFIL
   ========================================================= */

const profileButton =
    document.getElementById(
        "profileButton"
    );


if (profileButton) {

    profileButton.addEventListener(
        "click",
        () => {

            showSection(
                "profileSection"
            );

            populateProfileForm();

        }
    );

}



/* =========================================================
   SELECCIÓN DE NIVEL
   ========================================================= */

const levelButtons =
    document.querySelectorAll(
        "[data-profile-level]"
    );


levelButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                levelButtons.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


                profile.level =
                    button.dataset.profileLevel;

            }
        );

    }
);



/* =========================================================
   SELECCIÓN DE OBJETIVO
   ========================================================= */

const goalButtons =
    document.querySelectorAll(
        "[data-profile-goal]"
    );


goalButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                goalButtons.forEach(
                    item => {

                        item.classList.remove(
                            "selected"
                        );

                    }
                );


                button.classList.add(
                    "selected"
                );


                profile.goal =
                    button.dataset.profileGoal;

            }
        );

    }
);



/* =========================================================
   GUARDAR PERFIL
   ========================================================= */

const saveProfileButton =
    document.getElementById(
        "saveProfileButton"
    );


if (saveProfileButton) {

    saveProfileButton.addEventListener(
        "click",
        () => {

            readProfileForm();


            if (!profile.name) {

                alert(
                    "Ingresá tu nombre para continuar."
                );

                return;

            }


            if (!profile.age) {

                alert(
                    "Ingresá tu edad para continuar."
                );

                return;

            }


            if (!profile.level) {

                alert(
                    "Seleccioná tu nivel de entrenamiento."
                );

                return;

            }


            if (!profile.goal) {

                alert(
                    "Seleccioná tu objetivo."
                );

                return;

            }


            if (!profile.days) {

                alert(
                    "Seleccioná cuántos días por semana entrenás."
                );

                return;

            }


            if (!profile.time) {

                alert(
                    "Seleccioná cuánto tiempo tenés disponible."
                );

                return;

            }


            saveProfile();

        }
    );

}



/* =========================================================
   ENTRENAMIENTO
   ========================================================= */

const startWorkoutButton =
    document.getElementById(
        "startWorkoutButton"
    );


const viewWorkoutButton =
    document.getElementById(
        "viewWorkoutButton"
    );


if (startWorkoutButton) {

    startWorkoutButton.addEventListener(
        "click",
        () => {

            showSection(
                "routinesSection"
            );

        }
    );

}


if (viewWorkoutButton) {

    viewWorkoutButton.addEventListener(
        "click",
        () => {

            showSection(
                "routinesSection"
            );

        }
    );

}



/* =========================================================
   TEMPORIZADOR
   ========================================================= */

const timerButton =
    document.getElementById(
        "timerButton"
    );


const timerModal =
    document.getElementById(
        "timerModal"
    );


const closeTimer =
    document.getElementById(
        "closeTimer"
    );


const startTimer =
    document.getElementById(
        "startTimer"
    );


const timerDisplay =
    document.getElementById(
        "timerDisplay"
    );


const timerOptions =
    document.querySelectorAll(
        ".timer-option"
    );


let timerSeconds = 90;

let timerInterval = null;

let timerRunning = false;



function formatTime(seconds) {

    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        seconds % 60;


    return (
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(remainingSeconds)
            .padStart(2, "0")
    );

}



function updateTimerDisplay() {

    if (!timerDisplay) {

        return;

    }


    timerDisplay.textContent =
        formatTime(
            timerSeconds
        );

}



function closeTimerModal() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    if (timerModal) {
        timerModal.classList.remove("active");
        
    }
}



function stopTimer() {

    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval = null;

    }


    timerRunning = false;


    if (startTimer) {

        startTimer.textContent =
            "▶ Iniciar";

    }

}



function runTimer() {

    if (timerSeconds <= 0) {

        timerSeconds = 90;

    }


    timerRunning = true;


    startTimer.textContent =
        "⏸ Pausar";


    timerInterval =
        setInterval(
            () => {

                timerSeconds--;

                updateTimerDisplay();


                if (
                    timerSeconds <= 0
                ) {

                    stopTimer();


                    timerSeconds = 0;


                    updateTimerDisplay();


                    if (
                        "vibrate"
                        in navigator
                    ) {

                        navigator.vibrate(
                            [300, 150, 300]
                        );

                    }


                    startTimer.textContent =
                        "▶ Iniciar";

                }

            },
            1000
        );

}



if (timerButton) {

    timerButton.addEventListener(
        "click",
        () => {

            if (!timerModal) {

                return;

            }


            timerModal.classList.add(
                "active"
            );


            updateTimerDisplay();

        }
    );

}



if (closeTimer) {

    closeTimer.addEventListener(
        "click",
        () => {

            closeTimerModal();

        }
    );

}



if (timerModal) {

    timerModal.addEventListener(
        "click",
        event => {

            if (
                event.target
                === timerModal
            ) {

                closeTimerModal();

            }

        }
    );

}



timerOptions.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                stopTimer();


                timerSeconds =
                    Number(
                        button.dataset.time
                    );


                updateTimerDisplay();

            }
        );

    }
);



if (startTimer) {

    startTimer.addEventListener(
        "click",
        () => {

            if (timerRunning) {

                stopTimer();

            } else {

                runTimer();

            }

        }
    );

}



/* =========================================================
   BÚSQUEDA DE EJERCICIOS
   ========================================================= */

const exerciseSearch =
    document.getElementById(
        "exerciseSearch"
    );


const exerciseCards =
    document.querySelectorAll(
        ".exercise-card"
    );


if (exerciseSearch) {

    exerciseSearch.addEventListener(
        "input",
        () => {

            const search =
                exerciseSearch.value
                    .trim()
                    .toLowerCase();


            exerciseCards.forEach(
                card => {

                    const text =
                        card.textContent
                            .toLowerCase();


                    if (
                        text.includes(search)
                        ||
                        search === ""
                    ) {

                        card.style.display =
                            "flex";

                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );

        }
    );

}



/* =========================================================
   FILTROS DE EJERCICIOS
   ========================================================= */

const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );


filterButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const filter =
                    button.textContent
                        .trim()
                        .toLowerCase();


                exerciseCards.forEach(
                    card => {

                        const text =
                            card.textContent
                                .toLowerCase();


                        if (
                            filter === "todos"
                            ||
                            text.includes(filter)
                        ) {

                            card.style.display =
                                "flex";

                        } else {

                            card.style.display =
                                "none";

                        }

                    }
                );

            }
        );

    }
);



/* =========================================================
   CREAR RUTINA
   ========================================================= */

const createRoutineButton =
    document.getElementById(
        "createRoutineButton"
    );


if (createRoutineButton) {

    createRoutineButton.addEventListener(
        "click",
        () => {

            alert(
                "🚀 El creador de rutinas será el próximo módulo."
            );

        }
    );

}



/* =========================================================
   INICIALIZACIÓN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadProfile();

        populateProfileForm();

        updateWelcomeUser();

        showSection(
            "homeSection"
        );

        updateTimerDisplay();

    }
);