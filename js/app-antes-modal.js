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
   BIBLIOTECA DINÁMICA DE EJERCICIOS
   ========================================================= */

let exercisesDatabase = [];

let currentExerciseFilter = "Todos";


/* =========================================================
   CARGAR EJERCICIOS
   ========================================================= */

async function loadExercisesDatabase() {

    const exerciseList =
        document.getElementById(
            "exerciseList"
        );

    if (!exerciseList) {
        return;
    }


    try {

        const response =
            await fetch(
                "data/exercises.json"
            );


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }


        exercisesDatabase =
            await response.json();


        console.log(
            "STRONG GYM: biblioteca cargada",
            exercisesDatabase.length,
            "ejercicios"
        );


        renderExerciseCards(
            exercisesDatabase
        );


    } catch (error) {

        console.error(
            "Error cargando exercises.json:",
            error
        );


        exerciseList.innerHTML = `
            <div class="empty-state">

                <span>⚠️</span>

                <h3>
                    No se pudo cargar la biblioteca
                </h3>

                <p>
                    Revisá el archivo
                    data/exercises.json
                </p>

            </div>
        `;

    }

}


/* =========================================================
   GENERAR TARJETAS
   ========================================================= */

function renderExerciseCards(
    exercises
) {

    const exerciseList =
        document.getElementById(
            "exerciseList"
        );


    if (!exerciseList) {
        return;
    }


    /*
     * Eliminamos las tarjetas antiguas
     * que estaban escritas directamente
     * en index.html.
     */

    exerciseList.innerHTML = "";


    if (
        !exercises ||
        exercises.length === 0
    ) {

        exerciseList.innerHTML = `
            <div class="empty-state">

                <span>🔎</span>

                <h3>
                    No encontramos ejercicios
                </h3>

                <p>
                    Probá con otro término
                    o categoría.
                </p>

            </div>
        `;

        return;
    }


    exercises.forEach(
        exercise => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "exercise-card";


            const primaryMuscles =
                Array.isArray(
                    exercise.primaryMuscles
                )
                    ? exercise.primaryMuscles.join(
                        " · "
                    )
                    : "";


            card.innerHTML = `

                <div class="exercise-image">
                    🏋️
                </div>


                <div class="exercise-info">

                    <span class="exercise-muscle">
                        ${escapeExerciseHTML(
                            exercise.category
                        )}
                    </span>


                    <h3>
                        ${escapeExerciseHTML(
                            exercise.name
                        )}
                    </h3>


                    <p>
                        ${escapeExerciseHTML(
                            primaryMuscles
                        )}
                    </p>


                    <button
                        type="button"
                        class="small-button exercise-view-button"
                        data-exercise-id="${escapeExerciseHTML(
                            exercise.id
                        )}"
                    >
                        Ver ejercicio →
                    </button>

                </div>

            `;


            exerciseList.appendChild(
                card
            );

        }
    );


    /*
     * Conectar botones
     * "Ver ejercicio".
     */

    const buttons =
        exerciseList.querySelectorAll(
            ".exercise-view-button"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const exerciseId =
                        button.dataset.exerciseId;


                    showExerciseDetails(
                        exerciseId
                    );

                }
            );

        }
    );

}


/* =========================================================
   BUSCADOR
   ========================================================= */

const exerciseSearch =
    document.getElementById(
        "exerciseSearch"
    );


if (exerciseSearch) {

    exerciseSearch.addEventListener(
        "input",
        () => {

            applyExerciseFilters();

        }
    );

}


/* =========================================================
   FILTROS
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


                currentExerciseFilter =
                    button.textContent.trim();


                applyExerciseFilters();

            }
        );

    }
);


/* =========================================================
   APLICAR BUSCADOR + FILTRO
   ========================================================= */

function applyExerciseFilters() {

    const search =
        exerciseSearch
            ? exerciseSearch.value
                .trim()
                .toLowerCase()
            : "";


    const filter =
        currentExerciseFilter
            .trim()
            .toLowerCase();


    const filtered =
        exercisesDatabase.filter(
            exercise => {

                const searchText = [

                    exercise.name,

                    exercise.category,

                    exercise.equipment,

                    exercise.level,

                    exercise.type,

                    ...(exercise.primaryMuscles || []),

                    ...(exercise.secondaryMuscles || [])

                ]
                    .join(" ")
                    .toLowerCase();


                const matchesSearch =
                    search === "" ||
                    searchText.includes(
                        search
                    );


                const matchesFilter =
                    filter === "todos" ||
                    exercise.category
                        .toLowerCase()
                        ===
                    filter;


                return (
                    matchesSearch &&
                    matchesFilter
                );

            }
        );


    renderExerciseCards(
        filtered
    );

}


/* =========================================================
   FICHA DEL EJERCICIO
   ========================================================= */

function showExerciseDetails(
    exerciseId
) {

    const exercise =
        exercisesDatabase.find(
            item =>
                item.id === exerciseId
        );


    if (!exercise) {

        console.error(
            "Ejercicio no encontrado:",
            exerciseId
        );

        return;
    }


    const primary =
        (
            exercise.primaryMuscles || []
        ).join(
            ", "
        );


    const secondary =
        (
            exercise.secondaryMuscles || []
        ).join(
            ", "
        );


    const technique =
        (
            exercise.technique || []
        )
            .map(
                (step, index) =>
                    `${index + 1}. ${step}`
            )
            .join(
                "\n"
            );


    const errors =
        (
            exercise.errors || []
        )
            .map(
                error =>
                    `• ${error}`
            )
            .join(
                "\n"
            );


    alert(
        `🏋️ ${exercise.name}

MÚSCULO PRINCIPAL
${primary}

MÚSCULOS SECUNDARIOS
${secondary}

EQUIPAMIENTO
${exercise.equipment}

NIVEL
${exercise.level}

TIPO
${exercise.type}

SERIES
${exercise.sets}

REPETICIONES
${exercise.reps}

DESCANSO
${exercise.rest}

DESCRIPCIÓN
${exercise.description}

TÉCNICA
${technique}

ERRORES FRECUENTES
${errors}`
    );

}


/* =========================================================
   PROTECCIÓN DE TEXTO
   ========================================================= */

function escapeExerciseHTML(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   INICIAR BIBLIOTECA
   ========================================================= */

loadExercisesDatabase();




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