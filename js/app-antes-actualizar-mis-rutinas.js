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
){

    const exercise =
        exercisesDatabase.find(
            item =>
                String(item.id) ===
                String(exerciseId)
        );

    if(!exercise){

        console.error(
            "Ejercicio no encontrado:",
            exerciseId
        );

        return;
    }

    let modal =
        document.getElementById(
            "exerciseDetailModal"
        );

    if(!modal){

        modal =
            document.createElement(
                "div"
            );

        modal.id =
            "exerciseDetailModal";

        modal.className =
            "exercise-detail-modal";

        document.body.appendChild(
            modal
        );

        const style =
            document.createElement(
                "style"
            );

        style.id =
            "exerciseDetailModalStyles";

        style.textContent = `

            .exercise-detail-modal{
                position:fixed;
                inset:0;
                z-index:1000;
                display:flex;
                align-items:flex-end;
                justify-content:center;
                padding:12px;
                background:rgba(17,24,39,.60);
                opacity:0;
                visibility:hidden;
                transition:
                    opacity .20s ease,
                    visibility .20s ease;
            }

            .exercise-detail-modal.active{
                opacity:1;
                visibility:visible;
            }

            .exercise-detail-card{
                position:relative;
                width:100%;
                max-width:560px;
                max-height:90vh;
                overflow-y:auto;
                padding:24px;
                border-radius:28px 28px 18px 18px;
                background:#ffffff;
                color:#111827;
                box-shadow:
                    0 -12px 40px
                    rgba(0,0,0,.20);
                transform:translateY(20px);
                transition:transform .20s ease;
            }

            .exercise-detail-modal.active
            .exercise-detail-card{
                transform:translateY(0);
            }

            .exercise-detail-close{
                position:absolute;
                top:14px;
                right:14px;
                width:40px;
                height:40px;
                border:none;
                border-radius:50%;
                background:#f3f4f6;
                color:#111827;
                font-size:24px;
                line-height:1;
                cursor:pointer;
            }

            .exercise-detail-close:hover{
                background:#e5e7eb;
            }

            .exercise-detail-header{
                padding-right:50px;
                margin-bottom:20px;
            }

            .exercise-detail-category{
                display:inline-block;
                margin-bottom:7px;
                color:var(--accent-dark);
                font-size:11px;
                font-weight:800;
                letter-spacing:.08em;
                text-transform:uppercase;
            }

            .exercise-detail-title{
                margin:0;
                color:#111827;
                font-size:28px;
                line-height:1.1;
            }

            .exercise-detail-description{
                margin:10px 0 0;
                color:#6b7280;
                font-size:14px;
                line-height:1.6;
            }

            .exercise-detail-grid{
                display:grid;
                grid-template-columns:
                    repeat(2,minmax(0,1fr));
                gap:10px;
                margin-bottom:22px;
            }

            .exercise-detail-stat{
                padding:14px;
                border-radius:16px;
                background:#f9fafb;
                border:1px solid #e5e7eb;
            }

            .exercise-detail-stat-label{
                display:block;
                margin-bottom:5px;
                color:#6b7280;
                font-size:10px;
                font-weight:800;
                letter-spacing:.06em;
                text-transform:uppercase;
            }

            .exercise-detail-stat-value{
                display:block;
                color:#111827;
                font-size:14px;
                font-weight:700;
                line-height:1.4;
            }

            .exercise-detail-section{
                margin-top:22px;
            }

            .exercise-detail-section h3{
                margin:0 0 10px;
                color:#111827;
                font-size:17px;
            }

            .exercise-detail-list{
                margin:0;
                padding-left:22px;
                color:#4b5563;
                font-size:14px;
                line-height:1.7;
            }

            .exercise-detail-list li{
                margin-bottom:5px;
            }

            .exercise-detail-errors{
                margin:0;
                padding:0;
                list-style:none;
            }

            .exercise-detail-errors li{
                margin-bottom:8px;
                padding:11px 13px;
                border-radius:12px;
                background:#fff7ed;
                color:#9a3412;
                font-size:13px;
                line-height:1.5;
            }

            .exercise-detail-actions{
                display:flex;
                gap:10px;
                margin-top:24px;
            }

            .exercise-detail-action{
                flex:1;
                min-height:48px;
                border:none;
                border-radius:14px;
                padding:12px 16px;
                background:var(--accent);
                color:#ffffff;
                font-size:14px;
                font-weight:800;
                cursor:pointer;
            }

            .exercise-detail-action.secondary{
                background:#f3f4f6;
                color:#111827;
            }

            @media(min-width:700px){

                .exercise-detail-modal{
                    align-items:center;
                }

                .exercise-detail-card{
                    border-radius:28px;
                }

            }

        `;

        document.head.appendChild(
            style
        );
    }

    const primary =
        Array.isArray(
            exercise.primaryMuscles
        )
            ? exercise.primaryMuscles.join(" · ")
            : "No especificado";

    const secondary =
        Array.isArray(
            exercise.secondaryMuscles
        )
            ? exercise.secondaryMuscles.join(" · ")
            : "No especificado";

    const technique =
        Array.isArray(
            exercise.technique
        )
            ? exercise.technique
            : [];

    const errors =
        Array.isArray(
            exercise.errors
        )
            ? exercise.errors
            : [];

    const techniqueHTML =
        technique.length
            ? `
                <ol class="exercise-detail-list">

                    ${technique
                        .map(
                            step => `
                                <li>
                                    ${escapeExerciseHTML(step)}
                                </li>
                            `
                        )
                        .join("")}

                </ol>
            `
            : `
                <p class="exercise-detail-description">
                    No hay información técnica
                    disponible para este ejercicio.
                </p>
            `;

    const errorsHTML =
        errors.length
            ? `
                <ul class="exercise-detail-errors">

                    ${errors
                        .map(
                            error => `
                                <li>
                                    ⚠️
                                    ${escapeExerciseHTML(error)}
                                </li>
                            `
                        )
                        .join("")}

                </ul>
            `
            : `
                <p class="exercise-detail-description">
                    No hay errores frecuentes
                    registrados.
                </p>
            `;

    modal.innerHTML = `

        <div
            class="exercise-detail-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="exerciseDetailTitle"
        >

            <button
                type="button"
                class="exercise-detail-close"
                id="exerciseDetailClose"
                aria-label="Cerrar"
            >
                ×
            </button>

            <div class="exercise-detail-header">

                <span class="exercise-detail-category">
                    ${escapeExerciseHTML(
                        exercise.category ||
                        "EJERCICIO"
                    )}
                </span>

                <h2
                    id="exerciseDetailTitle"
                    class="exercise-detail-title"
                >
                    ${escapeExerciseHTML(
                        exercise.name
                    )}
                </h2>

                <p class="exercise-detail-description">
                    ${escapeExerciseHTML(
                        exercise.description || ""
                    )}
                </p>

            </div>

            <div class="exercise-detail-grid">

                <div class="exercise-detail-stat">

                    <span class="exercise-detail-stat-label">
                        Músculo principal
                    </span>

                    <span class="exercise-detail-stat-value">
                        ${escapeExerciseHTML(primary)}
                    </span>

                </div>

                <div class="exercise-detail-stat">

                    <span class="exercise-detail-stat-label">
                        Músculos secundarios
                    </span>

                    <span class="exercise-detail-stat-value">
                        ${escapeExerciseHTML(secondary)}
                    </span>

                </div>

                <div class="exercise-detail-stat">

                    <span class="exercise-detail-stat-label">
                        Equipamiento
                    </span>

                    <span class="exercise-detail-stat-value">
                        ${escapeExerciseHTML(
                            exercise.equipment ||
                            "No especificado"
                        )}
                    </span>

                </div>

                <div class="exercise-detail-stat">

                    <span class="exercise-detail-stat-label">
                        Nivel
                    </span>

                    <span class="exercise-detail-stat-value">
                        ${escapeExerciseHTML(
                            exercise.level ||
                            "No especificado"
                        )}
                    </span>

                </div>

                <div class="exercise-detail-stat">

                    <span class="exercise-detail-stat-label">
                        Series
                    </span>

                    <span class="exercise-detail-stat-value">
                        ${escapeExerciseHTML(
                            exercise.sets ||
                            "No especificado"
                        )}
                    </span>

                </div>

                <div class="exercise-detail-stat">

                    <span class="exercise-detail-stat-label">
                        Repeticiones
                    </span>

                    <span class="exercise-detail-stat-value">
                        ${escapeExerciseHTML(
                            exercise.reps ||
                            "No especificado"
                        )}
                    </span>

                </div>

                <div class="exercise-detail-stat">

                    <span class="exercise-detail-stat-label">
                        Descanso
                    </span>

                    <span class="exercise-detail-stat-value">
                        ${escapeExerciseHTML(
                            exercise.rest ||
                            "No especificado"
                        )}
                    </span>

                </div>

                <div class="exercise-detail-stat">

                    <span class="exercise-detail-stat-label">
                        Tipo
                    </span>

                    <span class="exercise-detail-stat-value">
                        ${escapeExerciseHTML(
                            exercise.type ||
                            "No especificado"
                        )}
                    </span>

                </div>

            </div>

            <section class="exercise-detail-section">

                <h3>
                    📖 Técnica
                </h3>

                ${techniqueHTML}

            </section>

            <section class="exercise-detail-section">

                <h3>
                    ⚠️ Errores frecuentes
                </h3>

                ${errorsHTML}

            </section>

            <div class="exercise-detail-actions">

                <button
                    type="button"
                    class="exercise-detail-action secondary"
                    id="exerciseDetailCloseBottom"
                >
                    Cerrar
                </button>

                <button
                    type="button"
                    class="exercise-detail-action"
                    id="exerciseAddToRoutine"
                >
                    ＋ Agregar a rutina
                </button>

            </div>

        </div>
    `;

    requestAnimationFrame(
        () => {
            modal.classList.add("active");
        }
    );

    const closeButton =
        document.getElementById(
            "exerciseDetailClose"
        );

    const closeBottom =
        document.getElementById(
            "exerciseDetailCloseBottom"
        );

    function closeExerciseModal(){

        modal.classList.remove(
            "active"
        );

    }

    if(closeButton){

        closeButton.addEventListener(
            "click",
            closeExerciseModal
        );

    }

    if(closeBottom){

        closeBottom.addEventListener(
            "click",
            closeExerciseModal
        );

    }

    modal.onclick =
        event => {

            if(event.target === modal){

                closeExerciseModal();

            }

        };

    const escapeHandler =
        event => {

            if(event.key === "Escape"){

                closeExerciseModal();

                document.removeEventListener(
                    "keydown",
                    escapeHandler
                );

            }

        };

    document.addEventListener(
        "keydown",
        escapeHandler
    );

    const addToRoutine =
        document.getElementById(
            "exerciseAddToRoutine"
        );

    if(addToRoutine){

        addToRoutine.addEventListener(
            "click",
            () => {

                alert(
                    `✅ ${exercise.name} quedó seleccionado para agregar a tu rutina.\n\nEl creador de rutinas será conectado en el próximo módulo.`
                );

            }
        );

    }

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


function openRoutineCreator() {

    let modal =
        document.getElementById(
            "routineCreatorModal"
        );


    if (!modal) {

        modal =
            document.createElement(
                "div"
            );


        modal.id =
            "routineCreatorModal";


        modal.className =
            "routine-creator-modal";


        document.body.appendChild(
            modal
        );


        const style =
            document.createElement(
                "style"
            );


        style.id =
            "routineCreatorModalStyles";


        style.textContent = `

            .routine-creator-modal {

                position: fixed;

                inset: 0;

                z-index: 1100;

                display: flex;

                align-items: flex-end;

                justify-content: center;

                padding: 12px;

                background:
                    rgba(17,24,39,.60);

                opacity: 0;

                visibility: hidden;

                transition:
                    opacity .2s ease,
                    visibility .2s ease;

            }


            .routine-creator-modal.active {

                opacity: 1;

                visibility: visible;

            }


            .routine-creator-card {

                width: 100%;

                max-width: 560px;

                max-height: 90vh;

                overflow-y: auto;

                padding: 24px;

                border-radius:
                    28px 28px 18px 18px;

                background: #ffffff;

                box-shadow:
                    0 -12px 40px
                    rgba(0,0,0,.20);

                transform:
                    translateY(20px);

                transition:
                    transform .2s ease;

            }


            .routine-creator-modal.active
            .routine-creator-card {

                transform:
                    translateY(0);

            }


            .routine-creator-header {

                display: flex;

                align-items: center;

                justify-content: space-between;

                gap: 15px;

                margin-bottom: 22px;

            }


            .routine-creator-header h2 {

                margin: 0;

                color: #111827;

                font-size: 24px;

            }


            .routine-creator-close {

                width: 40px;

                height: 40px;

                flex-shrink: 0;

                border: none;

                border-radius: 50%;

                background: #f3f4f6;

                color: #111827;

                font-size: 24px;

                cursor: pointer;

            }


            .routine-creator-label {

                display: block;

                margin-bottom: 8px;

                color: #374151;

                font-size: 12px;

                font-weight: 800;

                text-transform: uppercase;

                letter-spacing: .05em;

            }


            .routine-creator-input {

                width: 100%;

                box-sizing: border-box;

                min-height: 48px;

                padding: 12px 14px;

                border:
                    1px solid #e5e7eb;

                border-radius: 14px;

                outline: none;

                color: #111827;

                background: #ffffff;

                font-size: 15px;

            }


            .routine-creator-input:focus {

                border-color:
                    var(--accent);

                box-shadow:
                    0 0 0 3px
                    rgba(245,158,11,.15);

            }


            .routine-creator-description {

                margin:
                    8px 0 22px;

                color: #6b7280;

                font-size: 13px;

                line-height: 1.5;

            }


            .routine-creator-section {

                margin-top: 22px;

            }


            .routine-creator-section h3 {

                margin:
                    0 0 12px;

                color: #111827;

                font-size: 16px;

            }


            .routine-creator-days {

                display: grid;

                grid-template-columns:
                    repeat(7, 1fr);

                gap: 6px;

            }


            .routine-day {

                min-height: 42px;

                border:
                    1px solid #e5e7eb;

                border-radius: 10px;

                background: #f9fafb;

                color: #374151;

                font-size: 12px;

                font-weight: 700;

                cursor: pointer;

            }


            .routine-day.active {

                border-color:
                    var(--accent);

                background:
                    var(--accent);

                color: #ffffff;

            }


            .routine-creator-actions {

                display: flex;

                gap: 10px;

                margin-top: 26px;

            }


            .routine-creator-button {

                flex: 1;

                min-height: 48px;

                border: none;

                border-radius: 14px;

                padding: 12px 16px;

                font-size: 14px;

                font-weight: 800;

                cursor: pointer;

            }


            .routine-creator-button.primary {

                background:
                    var(--accent);

                color: #ffffff;

            }


            .routine-creator-button.secondary {

                background: #f3f4f6;

                color: #111827;

            }


            @media (min-width: 700px) {

                .routine-creator-modal {

                    align-items: center;

                }


                .routine-creator-card {

                    border-radius: 28px;

                }

            }

        `;


        document.head.appendChild(
            style
        );


        modal.innerHTML = `

            <div
                class="routine-creator-card"
                role="dialog"
                aria-modal="true"
            >

                <div
                    class="routine-creator-header"
                >

                    <h2>
                        🏋️ Nueva rutina
                    </h2>


                    <button
                        type="button"
                        class="routine-creator-close"
                        id="routineCreatorClose"
                        aria-label="Cerrar"
                    >
                        ×
                    </button>

                </div>


                <label
                    class="routine-creator-label"
                    for="routineName"
                >
                    Nombre de la rutina
                </label>


                <input
                    type="text"
                    id="routineName"
                    class="routine-creator-input"
                    placeholder="Ej.: Pecho y tríceps"
                    maxlength="60"
                >


                <p
                    class="routine-creator-description"
                >
                    Creá una rutina personalizada.
                    En el próximo paso vamos a agregar
                    los ejercicios, series, repeticiones,
                    peso y descanso.
                </p>


                <div
                    class="routine-creator-section"
                >

                    <h3>
                        Días de entrenamiento
                    </h3>


                    <div
                        class="routine-creator-days"
                    >

                        <button
                            type="button"
                            class="routine-day"
                            data-day="Lunes"
                        >L</button>

                        <button
                            type="button"
                            class="routine-day"
                            data-day="Martes"
                        >M</button>

                        <button
                            type="button"
                            class="routine-day"
                            data-day="Miércoles"
                        >X</button>

                        <button
                            type="button"
                            class="routine-day"
                            data-day="Jueves"
                        >J</button>

                        <button
                            type="button"
                            class="routine-day"
                            data-day="Viernes"
                        >V</button>

                        <button
                            type="button"
                            class="routine-day"
                            data-day="Sábado"
                        >S</button>

                        <button
                            type="button"
                            class="routine-day"
                            data-day="Domingo"
                        >D</button>

                    </div>

                </div>


                <div
                    class="routine-creator-actions"
                >

                    <button
                        type="button"
                        class="routine-creator-button secondary"
                        id="routineCreatorCancel"
                    >
                        Cancelar
                    </button>


                    <button
                        type="button"
                        class="routine-creator-button primary"
                        id="routineCreatorContinue"
                    >
                        Continuar →
                    </button>

                </div>

            </div>

        `;


        const closeButton =
            document.getElementById(
                "routineCreatorClose"
            );


        const cancelButton =
            document.getElementById(
                "routineCreatorCancel"
            );


        const continueButton =
            document.getElementById(
                "routineCreatorContinue"
            );


        const dayButtons =
            modal.querySelectorAll(
                ".routine-day"
            );


        function closeRoutineCreator() {

            modal.classList.remove(
                "active"
            );

        }


        closeButton.addEventListener(
            "click",
            closeRoutineCreator
        );


        cancelButton.addEventListener(
            "click",
            closeRoutineCreator
        );


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    closeRoutineCreator();

                }

            }
        );


        dayButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        button.classList.toggle(
                            "active"
                        );

                    }
                );

            }
        );


        continueButton.addEventListener(
            "click",
            () => {

                const routineName =
                    document
                        .getElementById(
                            "routineName"
                        )
                        .value
                        .trim();


                const selectedDays =
                    Array.from(
                        dayButtons
                    )
                        .filter(
                            button =>
                                button.classList.contains(
                                    "active"
                                )
                        )
                        .map(
                            button =>
                                button.dataset.day
                        );


                if (!routineName) {

                    alert(
                        "Ingresá un nombre para la rutina."
                    );

                    return;

                }


                if (
                    selectedDays.length === 0
                ) {

                    alert(
                        "Seleccioná al menos un día de entrenamiento."
                    );

                    return;

                }


                openRoutineExerciseSelector(
                    routineName,
                    selectedDays
                );

            }
        );

    }


/* =========================================================
   SELECTOR DE EJERCICIOS PARA LA RUTINA
   ========================================================= */


/* =========================================================
   CONFIGURADOR DE SERIES / REPETICIONES / PESO / DESCANSO
   ========================================================= */

function openRoutineExerciseConfigurator(
    routineName,
    selectedDays,
    selectedExercises
){

    let modal =
        document.getElementById(
            "routineExerciseConfigurator"
        );


    if(modal){

        modal.remove();

    }


    modal =
        document.createElement(
            "div"
        );


    modal.id =
        "routineExerciseConfigurator";


    modal.className =
        "routine-exercise-configurator";


    document.body.appendChild(
        modal
    );


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "routineExerciseConfiguratorStyles";


    style.textContent = `

        .routine-exercise-configurator{

            position:fixed;

            inset:0;

            z-index:1300;

            display:flex;

            align-items:flex-end;

            justify-content:center;

            padding:12px;

            background:
                rgba(17,24,39,.60);

            opacity:0;

            visibility:hidden;

            transition:
                opacity .2s ease,
                visibility .2s ease;

        }


        .routine-exercise-configurator.active{

            opacity:1;

            visibility:visible;

        }


        .routine-exercise-configurator-card{

            width:100%;

            max-width:620px;

            max-height:92vh;

            overflow-y:auto;

            padding:22px;

            border-radius:
                28px
                28px
                18px
                18px;

            background:#ffffff;

            box-shadow:
                0 -12px 40px
                rgba(0,0,0,.20);

            transform:
                translateY(20px);

            transition:
                transform .2s ease;

        }


        .routine-exercise-configurator.active
        .routine-exercise-configurator-card{

            transform:
                translateY(0);

        }


        .routine-config-header{

            display:flex;

            align-items:center;

            justify-content:space-between;

            gap:12px;

            margin-bottom:8px;

        }


        .routine-config-header h2{

            margin:0;

            color:#111827;

            font-size:23px;

        }


        .routine-config-close{

            width:40px;

            height:40px;

            border:none;

            border-radius:50%;

            background:#f3f4f6;

            color:#111827;

            font-size:24px;

            cursor:pointer;

        }


        .routine-config-info{

            margin:
                0
                0
                20px;

            color:#6b7280;

            font-size:13px;

            line-height:1.5;

        }


        .routine-config-exercise{

            margin-bottom:16px;

            padding:16px;

            border:
                1px solid
                #e5e7eb;

            border-radius:18px;

            background:#ffffff;

        }


        .routine-config-exercise-header{

            display:flex;

            align-items:center;

            gap:10px;

            margin-bottom:14px;

        }


        .routine-config-number{

            display:flex;

            align-items:center;

            justify-content:center;

            width:30px;

            height:30px;

            flex-shrink:0;

            border-radius:50%;

            background:
                var(--accent);

            color:#ffffff;

            font-size:12px;

            font-weight:800;

        }


        .routine-config-exercise-name{

            margin:0;

            color:#111827;

            font-size:16px;

            font-weight:800;

        }


        .routine-config-grid{

            display:grid;

            grid-template-columns:
                repeat(2,minmax(0,1fr));

            gap:10px;

        }


        .routine-config-field{

            display:flex;

            flex-direction:column;

            gap:6px;

        }


        .routine-config-field label{

            color:#6b7280;

            font-size:10px;

            font-weight:800;

            letter-spacing:.05em;

            text-transform:uppercase;

        }


        .routine-config-input{

            width:100%;

            box-sizing:border-box;

            min-height:44px;

            padding:
                9px
                11px;

            border:
                1px solid
                #e5e7eb;

            border-radius:12px;

            outline:none;

            color:#111827;

            background:#ffffff;

            font-size:14px;

            font-weight:700;

        }


        .routine-config-input:focus{

            border-color:
                var(--accent);

            box-shadow:
                0 0 0 3px
                rgba(245,158,11,.15);

        }


        .routine-config-footer{

            display:flex;

            gap:10px;

            margin-top:22px;

        }


        .routine-config-button{

            flex:1;

            min-height:48px;

            border:none;

            border-radius:14px;

            font-size:14px;

            font-weight:800;

            cursor:pointer;

        }


        .routine-config-cancel{

            background:#f3f4f6;

            color:#111827;

        }


        .routine-config-save{

            background:
                var(--accent);

            color:#ffffff;

        }


        @media(min-width:700px){

            .routine-exercise-configurator{

                align-items:center;

            }


            .routine-exercise-configurator-card{

                border-radius:28px;

            }

        }

    `;


    document.head.appendChild(
        style
    );


    modal.innerHTML = `

        <div
            class="routine-exercise-configurator-card"
            role="dialog"
            aria-modal="true"
        >

            <div
                class="routine-config-header"
            >

                <h2>
                    ⚙️ Configurar rutina
                </h2>


                <button
                    type="button"
                    class="routine-config-close"
                    id="routineConfigClose"
                    aria-label="Cerrar"
                >
                    ×
                </button>

            </div>


            <p
                class="routine-config-info"
            >

                <strong>
                    ${escapeExerciseHTML(
                        routineName
                    )}
                </strong>

                <br>

                Días:
                ${escapeExerciseHTML(
                    selectedDays.join(", ")
                )}

                <br>

                Configurá cada ejercicio
                individualmente.

            </p>


            <div
                id="routineConfigExercises"
            ></div>


            <div
                class="routine-config-footer"
            >

                <button
                    type="button"
                    class="routine-config-button routine-config-cancel"
                    id="routineConfigCancel"
                >
                    Volver
                </button>


                <button
                    type="button"
                    class="routine-config-button routine-config-save"
                    id="routineConfigSave"
                >
                    💾 Guardar rutina
                </button>

            </div>

        </div>

    `;


    const exercisesContainer =
        modal.querySelector(
            "#routineConfigExercises"
        );


    const exerciseSettings =
        selectedExercises.map(
            exercise => ({

                id:
                    exercise.id,

                name:
                    exercise.name,

                sets:
                    4,

                reps:
                    10,

                weight:
                    0,

                rest:
                    90

            })
        );


    exercisesContainer.innerHTML =
        exerciseSettings
            .map(
                (item,index) => `

                    <div
                        class="routine-config-exercise"
                        data-exercise-id="${escapeExerciseHTML(
                            item.id
                        )}"
                    >

                        <div
                            class="routine-config-exercise-header"
                        >

                            <span
                                class="routine-config-number"
                            >
                                ${index + 1}
                            </span>


                            <h3
                                class="routine-config-exercise-name"
                            >

                                ${escapeExerciseHTML(
                                    item.name
                                )}

                            </h3>

                        </div>


                        <div
                            class="routine-config-grid"
                        >

                            <div
                                class="routine-config-field"
                            >

                                <label>
                                    Series
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    max="20"
                                    class="routine-config-input"
                                    data-field="sets"
                                    value="${item.sets}"
                                >

                            </div>


                            <div
                                class="routine-config-field"
                            >

                                <label>
                                    Repeticiones
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    max="100"
                                    class="routine-config-input"
                                    data-field="reps"
                                    value="${item.reps}"
                                >

                            </div>


                            <div
                                class="routine-config-field"
                            >

                                <label>
                                    Peso (kg)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.5"
                                    class="routine-config-input"
                                    data-field="weight"
                                    value="${item.weight}"
                                >

                            </div>


                            <div
                                class="routine-config-field"
                            >

                                <label>
                                    Descanso (seg)
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    max="600"
                                    step="5"
                                    class="routine-config-input"
                                    data-field="rest"
                                    value="${item.rest}"
                                >

                            </div>

                        </div>

                    </div>

                `
            )
            .join("");


    function closeConfigurator(){

        modal.remove();

    }


    modal.querySelector(
        "#routineConfigClose"
    ).addEventListener(
        "click",
        closeConfigurator
    );


    modal.querySelector(
        "#routineConfigCancel"
    ).addEventListener(
        "click",
        closeConfigurator
    );


    modal.addEventListener(
        "click",
        event => {

            if(
                event.target ===
                modal
            ){

                closeConfigurator();

            }

        }
    );


    modal.querySelector(
        "#routineConfigSave"
    ).addEventListener(
        "click",
        () => {

            const cards =
                modal.querySelectorAll(
                    ".routine-config-exercise"
                );


            const configuredExercises =
                Array.from(
                    cards
                ).map(
                    card => {

                        const id =
                            card.dataset.exerciseId;


                        const original =
                            selectedExercises.find(
                                exercise =>
                                    String(
                                        exercise.id
                                    ) ===
                                    String(id)
                            );


                        const result = {

                            id:
                                original.id,

                            name:
                                original.name,

                            sets:
                                Number(
                                    card.querySelector(
                                        '[data-field="sets"]'
                                    ).value
                                ),

                            reps:
                                Number(
                                    card.querySelector(
                                        '[data-field="reps"]'
                                    ).value
                                ),

                            weight:
                                Number(
                                    card.querySelector(
                                        '[data-field="weight"]'
                                    ).value
                                ),

                            rest:
                                Number(
                                    card.querySelector(
                                        '[data-field="rest"]'
                                    ).value
                                )

                        };


                        if(
                            result.sets < 1 ||
                            result.reps < 1 ||
                            result.weight < 0 ||
                            result.rest < 0
                        ){

                            throw new Error(
                                "Los valores de entrenamiento no son válidos."
                            );

                        }


                        return result;

                    }
                );


            try{

                const STORAGE_KEY =
                    "strongGymRoutines";


                const existingRoutines =
                    JSON.parse(
                        localStorage.getItem(
                            STORAGE_KEY
                        ) || "[]"
                    );


                const newRoutine = {

                    id:
                        "routine-" +
                        Date.now(),

                    name:
                        routineName,

                    days:
                        selectedDays,

                    exercises:
                        configuredExercises,

                    createdAt:
                        new Date().toISOString(),

                    updatedAt:
                        new Date().toISOString()

                };


                existingRoutines.push(
                    newRoutine
                );


                localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify(
                        existingRoutines
                    )
                );


                /*
                 * Mantener también la última rutina
                 * para compatibilidad con el sistema
                 * anterior.
                 */

                localStorage.setItem(
                    "strongGymLastRoutine",
                    JSON.stringify(
                        newRoutine
                    )
                );


                alert(
                    `✅ Rutina "${routineName}" guardada correctamente.\n\n${configuredExercises.length} ejercicio(s) configurado(s).`
                );


                closeConfigurator();

            }catch(error){

                console.error(
                    "Error guardando rutina:",
                    error
                );

                alert(
                    "No se pudo guardar la rutina."
                );

            }

        }
    );


    requestAnimationFrame(
        () => {

            modal.classList.add(
                "active"
            );

        }
    );

}

function openRoutineExerciseSelector(
    routineName,
    selectedDays
){

    let selector =
        document.getElementById(
            "routineExerciseSelector"
        );


    if(selector){

        selector.remove();

    }


    selector =
        document.createElement(
            "div"
        );


    selector.id =
        "routineExerciseSelector";


    selector.className =
        "routine-exercise-selector";


    document.body.appendChild(
        selector
    );


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "routineExerciseSelectorStyles";


    style.textContent = `

        .routine-exercise-selector{

            position:fixed;

            inset:0;

            z-index:1200;

            display:flex;

            align-items:flex-end;

            justify-content:center;

            padding:12px;

            background:
                rgba(17,24,39,.60);

            opacity:0;

            visibility:hidden;

            transition:
                opacity .2s ease,
                visibility .2s ease;

        }


        .routine-exercise-selector.active{

            opacity:1;

            visibility:visible;

        }


        .routine-exercise-selector-card{

            width:100%;

            max-width:600px;

            max-height:92vh;

            overflow-y:auto;

            padding:22px;

            border-radius:
                28px
                28px
                18px
                18px;

            background:#ffffff;

            box-shadow:
                0 -12px 40px
                rgba(0,0,0,.20);

            transform:
                translateY(20px);

            transition:
                transform .2s ease;

        }


        .routine-exercise-selector.active
        .routine-exercise-selector-card{

            transform:
                translateY(0);

        }


        .routine-exercise-selector-header{

            display:flex;

            align-items:center;

            justify-content:space-between;

            gap:12px;

            margin-bottom:16px;

        }


        .routine-exercise-selector-header h2{

            margin:0;

            color:#111827;

            font-size:23px;

        }


        .routine-exercise-selector-close{

            width:40px;

            height:40px;

            border:none;

            border-radius:50%;

            background:#f3f4f6;

            color:#111827;

            font-size:24px;

            cursor:pointer;

        }


        .routine-exercise-selector-info{

            margin:
                0
                0
                18px;

            color:#6b7280;

            font-size:13px;

            line-height:1.5;

        }


        .routine-exercise-search{

            width:100%;

            box-sizing:border-box;

            min-height:46px;

            margin-bottom:16px;

            padding:
                10px
                14px;

            border:
                1px solid
                #e5e7eb;

            border-radius:14px;

            outline:none;

            font-size:14px;

        }


        .routine-exercise-search:focus{

            border-color:
                var(--accent);

        }


        .routine-exercise-list{

            display:flex;

            flex-direction:column;

            gap:8px;

            max-height:48vh;

            overflow-y:auto;

        }


        .routine-exercise-item{

            display:flex;

            align-items:center;

            justify-content:space-between;

            gap:12px;

            padding:12px;

            border:
                1px solid
                #e5e7eb;

            border-radius:15px;

            background:#ffffff;

        }


        .routine-exercise-item-info{

            min-width:0;

        }


        .routine-exercise-item-name{

            margin:0;

            color:#111827;

            font-size:14px;

            font-weight:800;

        }


        .routine-exercise-item-muscle{

            display:block;

            margin-top:3px;

            color:#6b7280;

            font-size:11px;

        }


        .routine-exercise-add{

            flex-shrink:0;

            min-height:38px;

            padding:
                8px
                13px;

            border:none;

            border-radius:11px;

            background:
                var(--accent);

            color:#ffffff;

            font-size:12px;

            font-weight:800;

            cursor:pointer;

        }


        .routine-exercise-add.added{

            background:#e5e7eb;

            color:#6b7280;

            cursor:default;

        }


        .routine-selected-title{

            margin:
                22px
                0
                10px;

            color:#111827;

            font-size:16px;

        }


        .routine-selected-list{

            display:flex;

            flex-direction:column;

            gap:8px;

        }


        .routine-selected-item{

            display:flex;

            align-items:center;

            justify-content:space-between;

            gap:10px;

            padding:12px;

            border-radius:14px;

            background:#f9fafb;

            border:
                1px solid
                #e5e7eb;

        }


        .routine-selected-number{

            display:flex;

            align-items:center;

            justify-content:center;

            width:28px;

            height:28px;

            flex-shrink:0;

            border-radius:50%;

            background:
                var(--accent);

            color:#ffffff;

            font-size:12px;

            font-weight:800;

        }


        .routine-selected-name{

            flex:1;

            color:#111827;

            font-size:13px;

            font-weight:700;

        }


        .routine-selected-remove{

            border:none;

            background:transparent;

            color:#dc2626;

            font-size:18px;

            cursor:pointer;

        }


        .routine-exercise-footer{

            display:flex;

            gap:10px;

            margin-top:20px;

        }


        .routine-exercise-footer button{

            flex:1;

            min-height:48px;

            border:none;

            border-radius:14px;

            font-size:14px;

            font-weight:800;

            cursor:pointer;

        }


        .routine-exercise-cancel{

            background:#f3f4f6;

            color:#111827;

        }


        .routine-exercise-continue{

            background:
                var(--accent);

            color:#ffffff;

        }

    `;


    document.head.appendChild(
        style
    );


    const selectedExercises = [];


    selector.innerHTML = `

        <div
            class="routine-exercise-selector-card"
            role="dialog"
            aria-modal="true"
        >

            <div
                class="routine-exercise-selector-header"
            >

                <h2>
                    ➕ Agregar ejercicios
                </h2>


                <button
                    type="button"
                    class="routine-exercise-selector-close"
                    id="routineExerciseClose"
                >
                    ×
                </button>

            </div>


            <p
                class="routine-exercise-selector-info"
            >

                <strong>
                    ${escapeExerciseHTML(
                        routineName
                    )}
                </strong>

                <br>

                Días:
                ${escapeExerciseHTML(
                    selectedDays.join(
                        ", "
                    )
                )}

            </p>


            <input
                type="search"
                id="routineExerciseSearch"
                class="routine-exercise-search"
                placeholder="🔎 Buscar ejercicio..."
            >


            <div
                id="routineExerciseList"
                class="routine-exercise-list"
            ></div>


            <h3
                class="routine-selected-title"
            >
                Ejercicios seleccionados
            </h3>


            <div
                id="routineSelectedList"
                class="routine-selected-list"
            >

                <p
                    class="routine-exercise-selector-info"
                >
                    Todavía no agregaste ejercicios.
                </p>

            </div>


            <div
                class="routine-exercise-footer"
            >

                <button
                    type="button"
                    class="routine-exercise-cancel"
                    id="routineExerciseCancel"
                >
                    Volver
                </button>


                <button
                    type="button"
                    class="routine-exercise-continue"
                    id="routineExerciseContinue"
                >
                    Continuar →
                </button>

            </div>

        </div>

    `;


    const exerciseList =
        selector.querySelector(
            "#routineExerciseList"
        );


    const selectedList =
        selector.querySelector(
            "#routineSelectedList"
        );


    const searchInput =
        selector.querySelector(
            "#routineExerciseSearch"
        );


    function renderExerciseSelector(){

        const search =
            searchInput.value
                .trim()
                .toLowerCase();


        const filtered =
            exercisesDatabase.filter(
                exercise => {

                    const text = [

                        exercise.name,

                        exercise.category,

                        exercise.equipment,

                        ...(exercise.primaryMuscles || []),

                        ...(exercise.secondaryMuscles || [])

                    ]
                        .join(" ")
                        .toLowerCase();


                    return text.includes(
                        search
                    );

                }
            );


        exerciseList.innerHTML =
            filtered.map(
                exercise => {

                    const id =
                        String(
                            exercise.id
                        );


                    const added =
                        selectedExercises.some(
                            item =>
                                String(item.id) ===
                                id
                        );


                    return `

                        <div
                            class="routine-exercise-item"
                        >

                            <div
                                class="routine-exercise-item-info"
                            >

                                <p
                                    class="routine-exercise-item-name"
                                >

                                    ${escapeExerciseHTML(
                                        exercise.name
                                    )}

                                </p>


                                <span
                                    class="routine-exercise-item-muscle"
                                >

                                    ${escapeExerciseHTML(
                                        exercise.category ||
                                        ""
                                    )}

                                </span>

                            </div>


                            <button
                                type="button"
                                class="routine-exercise-add ${
                                    added
                                        ? "added"
                                        : ""
                                }"
                                data-exercise-id="${escapeExerciseHTML(id)}"
                                ${
                                    added
                                        ? "disabled"
                                        : ""
                                }
                            >

                                ${
                                    added
                                        ? "✓ Agregado"
                                        : "＋ Agregar"
                                }

                            </button>

                        </div>

                    `;

                }
            )
            .join("");


        exerciseList
            .querySelectorAll(
                ".routine-exercise-add:not(.added)"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const exercise =
                                exercisesDatabase.find(
                                    item =>
                                        String(item.id) ===
                                        String(
                                            button.dataset.exerciseId
                                        )
                                );


                            if(!exercise){
                                return;
                            }


                            if(
                                selectedExercises.some(
                                    item =>
                                        String(item.id) ===
                                        String(exercise.id)
                                )
                            ){
                                return;
                            }


                            selectedExercises.push(
                                exercise
                            );


                            renderExerciseSelector();

                            renderSelectedExercises();

                        }
                    );

                }
            );

    }


    function renderSelectedExercises(){

        if(
            selectedExercises.length ===
            0
        ){

            selectedList.innerHTML = `

                <p
                    class="routine-exercise-selector-info"
                >
                    Todavía no agregaste ejercicios.
                </p>

            `;

            return;

        }


        selectedList.innerHTML =
            selectedExercises
                .map(
                    (exercise,index) => `

                        <div
                            class="routine-selected-item"
                        >

                            <span
                                class="routine-selected-number"
                            >
                                ${index + 1}
                            </span>


                            <span
                                class="routine-selected-name"
                            >

                                ${escapeExerciseHTML(
                                    exercise.name
                                )}

                            </span>


                            <button
                                type="button"
                                class="routine-selected-remove"
                                data-remove-id="${escapeExerciseHTML(
                                    exercise.id
                                )}"
                                aria-label="Eliminar ejercicio"
                            >

                                ×

                            </button>

                        </div>

                    `
                )
                .join("");


        selectedList
            .querySelectorAll(
                ".routine-selected-remove"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            const index =
                                selectedExercises.findIndex(
                                    item =>
                                        String(item.id) ===
                                        String(
                                            button.dataset.removeId
                                        )
                                );


                            if(index !== -1){

                                selectedExercises.splice(
                                    index,
                                    1
                                );

                            }


                            renderExerciseSelector();

                            renderSelectedExercises();

                        }
                    );

                }
            );

    }


    searchInput.addEventListener(
        "input",
        renderExerciseSelector
    );


    selector.querySelector(
        "#routineExerciseClose"
    ).addEventListener(
        "click",
        () => selector.remove()
    );


    selector.querySelector(
        "#routineExerciseCancel"
    ).addEventListener(
        "click",
        () => selector.remove()
    );


    selector.querySelector(
        "#routineExerciseContinue"
    ).addEventListener(
        "click",
        () => {

            if(
                selectedExercises.length ===
                0
            ){

                alert(
                    "Agregá al menos un ejercicio a la rutina."
                );

                return;

            }


            openRoutineExerciseConfigurator(
                routineName,
                selectedDays,
                selectedExercises
            );

        }
    );


    selector.addEventListener(
        "click",
        event => {

            if(
                event.target ===
                selector
            ){

                selector.remove();

            }

        }
    );


    renderExerciseSelector();

    renderSelectedExercises();


    requestAnimationFrame(
        () => {

            selector.classList.add(
                "active"
            );

        }
    );

}


    requestAnimationFrame(
        () => {

            modal.classList.add(
                "active"
            );

        }
    );

}


if (createRoutineButton) {

    createRoutineButton.addEventListener(
        "click",
        openRoutineCreator
    );

}




/* =========================================================
   MIS RUTINAS
   ========================================================= */

function loadSavedRoutines(){

    const routineList =
        document.getElementById(
            "routineList"
        );


    if(!routineList){
        return;
    }


    let routines = [];


    try{

        routines =
            JSON.parse(
                localStorage.getItem(
                    "strongGymRoutines"
                ) || "[]"
            );


    }catch(error){

        console.error(
            "Error cargando rutinas:",
            error
        );

        routines = [];

    }


    if(
        !Array.isArray(routines) ||
        routines.length === 0
    ){

        routineList.innerHTML = `

            <div class="empty-state">

                <span>
                    📋
                </span>

                <h3>
                    Todavía no tenés rutinas
                </h3>

                <p>
                    Creá tu primera rutina
                    para comenzar.
                </p>

            </div>

        `;

        return;

    }


    routineList.innerHTML = "";


    routines
        .slice()
        .reverse()
        .forEach(
            routine => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "routine-card";


                const exerciseCount =
                    Array.isArray(
                        routine.exercises
                    )
                        ? routine.exercises.length
                        : 0;


                const days =
                    Array.isArray(
                        routine.days
                    )
                        ? routine.days.join(
                            " · "
                        )
                        : "";


                card.innerHTML = `

                    <div
                        class="routine-card-header"
                    >

                        <div>

                            <span
                                class="routine-card-label"
                            >
                                ENTRENAMIENTO
                            </span>


                            <h3>

                                ${escapeExerciseHTML(
                                    routine.name ||
                                    "Rutina sin nombre"
                                )}

                            </h3>

                        </div>


                        <span
                            class="routine-card-icon"
                        >
                            🏋️
                        </span>

                    </div>


                    <div
                        class="routine-card-info"
                    >

                        <div>

                            <span>
                                📅 Días
                            </span>

                            <strong>

                                ${escapeExerciseHTML(
                                    days ||
                                    "Sin días"
                                )}

                            </strong>

                        </div>


                        <div>

                            <span>
                                💪 Ejercicios
                            </span>

                            <strong>

                                ${exerciseCount}

                            </strong>

                        </div>

                    </div>


                    <div
                        class="routine-card-actions"
                    >

                        <button
                            type="button"
                            class="routine-open-button"
                            data-routine-id="${escapeExerciseHTML(
                                routine.id
                            )}"
                        >

                            ▶ Abrir rutina

                        </button>


                        <button
                            type="button"
                            class="routine-delete-button"
                            data-routine-id="${escapeExerciseHTML(
                                routine.id
                            )}"
                        >

                            🗑 Eliminar

                        </button>

                    </div>

                `;


                routineList.appendChild(
                    card
                );

            }
        );


    /*
     * Estilos de Mis rutinas.
     */

    if(
        !document.getElementById(
            "savedRoutinesStyles"
        )
    ){

        const style =
            document.createElement(
                "style"
            );


        style.id =
            "savedRoutinesStyles";


        style.textContent = `

            .routine-card{

                margin-top:14px;

                padding:18px;

                border:
                    1px solid
                    #e5e7eb;

                border-radius:20px;

                background:#ffffff;

                box-shadow:
                    0 4px 16px
                    rgba(0,0,0,.05);

            }


            .routine-card-header{

                display:flex;

                align-items:center;

                justify-content:space-between;

                gap:12px;

            }


            .routine-card-label{

                display:block;

                margin-bottom:4px;

                color:
                    var(--accent-dark);

                font-size:10px;

                font-weight:800;

                letter-spacing:.08em;

            }


            .routine-card-header h3{

                margin:0;

                color:#111827;

                font-size:18px;

            }


            .routine-card-icon{

                display:flex;

                align-items:center;

                justify-content:center;

                width:42px;

                height:42px;

                border-radius:14px;

                background:#f3f4f6;

                font-size:21px;

            }


            .routine-card-info{

                display:grid;

                grid-template-columns:
                    1fr 1fr;

                gap:10px;

                margin-top:16px;

            }


            .routine-card-info > div{

                padding:11px;

                border-radius:12px;

                background:#f9fafb;

            }


            .routine-card-info span{

                display:block;

                margin-bottom:4px;

                color:#6b7280;

                font-size:10px;

                font-weight:700;

            }


            .routine-card-info strong{

                display:block;

                color:#111827;

                font-size:12px;

                line-height:1.4;

            }


            .routine-card-actions{

                display:flex;

                gap:8px;

                margin-top:14px;

            }


            .routine-card-actions button{

                flex:1;

                min-height:42px;

                border:none;

                border-radius:12px;

                padding:
                    9px
                    12px;

                font-size:12px;

                font-weight:800;

                cursor:pointer;

            }


            .routine-open-button{

                background:
                    var(--accent);

                color:#ffffff;

            }


            .routine-delete-button{

                background:#f3f4f6;

                color:#dc2626;

            }

        `;


        document.head.appendChild(
            style
        );

    }


    /*
     * Abrir rutina.
     */

    routineList
        .querySelectorAll(
            ".routine-open-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const routine =
                            routines.find(
                                item =>
                                    String(
                                        item.id
                                    ) ===
                                    String(
                                        button.dataset.routineId
                                    )
                            );


                        if(!routine){
                            return;
                        }


                        showSavedRoutine(
                            routine
                        );

                    }
                );

            }
        );


    /*
     * Eliminar rutina.
     */

    routineList
        .querySelectorAll(
            ".routine-delete-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const routine =
                            routines.find(
                                item =>
                                    String(
                                        item.id
                                    ) ===
                                    String(
                                        button.dataset.routineId
                                    )
                            );


                        if(!routine){
                            return;
                        }


                        const confirmed =
                            confirm(
                                `¿Querés eliminar la rutina "${routine.name}"?`
                            );


                        if(!confirmed){
                            return;
                        }


                        const remaining =
                            routines.filter(
                                item =>
                                    String(
                                        item.id
                                    ) !==
                                    String(
                                        routine.id
                                    )
                            );


                        localStorage.setItem(
                            "strongGymRoutines",
                            JSON.stringify(
                                remaining
                            )
                        );


                        loadSavedRoutines();

                    }
                );

            }
        );

}


/* =========================================================
   MOSTRAR RUTINA GUARDADA
   ========================================================= */

function showSavedRoutine(
    routine
){

    const exercises =
        Array.isArray(
            routine.exercises
        )
            ? routine.exercises
            : [];


    const exerciseText =
        exercises.length
            ? exercises
                .map(
                    (exercise,index) =>
                        `${index + 1}. ${exercise.name} — ${exercise.sets} x ${exercise.reps} — ${exercise.weight} kg — ${exercise.rest} seg`
                )
                .join("\n")
            : "Sin ejercicios";


    alert(
        `🏋️ ${routine.name}\n\n` +
        `📅 ${routine.days.join(", ")}\n\n` +
        `${exerciseText}`
    );

}


/* =========================================================
   CARGAR MIS RUTINAS AL INICIAR
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadSavedRoutines();

    }
);


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