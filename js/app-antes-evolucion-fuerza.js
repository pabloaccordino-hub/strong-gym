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


                /*
                 * Actualizar inmediatamente
                 * la pantalla Mis rutinas.
                 */

                if (
                    typeof loadSavedRoutines ===
                    "function"
                ) {

                    loadSavedRoutines();

                }


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


    let modal =
        document.getElementById(
            "savedRoutineEditor"
        );


    if(modal){

        modal.remove();

    }


    modal =
        document.createElement(
            "div"
        );


    modal.id =
        "savedRoutineEditor";


    modal.className =
        "saved-routine-editor";


    document.body.appendChild(
        modal
    );


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "savedRoutineEditorStyles";


    style.textContent = `

        .saved-routine-editor{

            position:fixed;

            inset:0;

            z-index:1300;

            display:flex;

            align-items:flex-end;

            justify-content:center;

            padding:12px;

            background:
                rgba(17,24,39,.65);

            opacity:0;

            visibility:hidden;

            transition:
                opacity .2s ease,
                visibility .2s ease;

        }


        .saved-routine-editor.active{

            opacity:1;

            visibility:visible;

        }


        .saved-routine-editor-card{

            width:100%;

            max-width:680px;

            max-height:94vh;

            overflow-y:auto;

            box-sizing:border-box;

            padding:22px;

            border-radius:
                28px
                28px
                18px
                18px;

            background:#ffffff;

            box-shadow:
                0 -12px 45px
                rgba(0,0,0,.25);

            transform:
                translateY(20px);

            transition:
                transform .2s ease;

        }


        .saved-routine-editor.active
        .saved-routine-editor-card{

            transform:
                translateY(0);

        }


        .saved-routine-editor-header{

            display:flex;

            align-items:flex-start;

            justify-content:space-between;

            gap:12px;

            margin-bottom:8px;

        }


        .saved-routine-editor-header h2{

            margin:0;

            color:#111827;

            font-size:23px;

        }


        .saved-routine-editor-days{

            margin:
                0
                0
                20px;

            color:#6b7280;

            font-size:13px;

        }


        .saved-routine-editor-close{

            width:40px;

            height:40px;

            flex-shrink:0;

            border:none;

            border-radius:50%;

            background:#f3f4f6;

            color:#111827;

            font-size:24px;

            cursor:pointer;

        }


        .saved-routine-exercise{

            margin-bottom:16px;

            padding:16px;

            border:
                1px solid
                #e5e7eb;

            border-radius:18px;

            background:#ffffff;

        }


        .saved-routine-exercise-title{

            display:flex;

            align-items:center;

            gap:10px;

            margin-bottom:15px;

        }


        .saved-routine-exercise-number{

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


        .saved-routine-exercise-name{

            color:#111827;

            font-size:15px;

            font-weight:800;

        }


        .saved-routine-fields{

            display:grid;

            grid-template-columns:
                repeat(2, minmax(0,1fr));

            gap:12px;

        }


        .saved-routine-field{

            display:flex;

            flex-direction:column;

            gap:6px;

        }


        .saved-routine-field label{

            color:#6b7280;

            font-size:11px;

            font-weight:700;

        }


        .saved-routine-field input{

            width:100%;

            min-height:44px;

            box-sizing:border-box;

            padding:
                8px
                10px;

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


        .saved-routine-field input:focus{

            border-color:
                var(--accent);

        }


        .saved-routine-footer{

            display:flex;

            gap:10px;

            margin-top:20px;

        }


        .saved-routine-footer button{

            flex:1;

            min-height:50px;

            border:none;

            border-radius:14px;

            font-size:14px;

            font-weight:800;

            cursor:pointer;

        }


        .saved-routine-cancel{

            background:#f3f4f6;

            color:#111827;

        }


        .saved-routine-save{

            background:
                var(--accent);

            color:#ffffff;

        }


        .saved-routine-training{

            flex:1;

            min-height:50px;

            border:none;

            border-radius:14px;

            background:#111827;

            color:#ffffff;

            font-size:14px;

            font-weight:800;

            cursor:pointer;

        }


        .saved-routine-training:hover{

            opacity:.9;

        }


        @media(max-width:480px){

            .saved-routine-fields{

                grid-template-columns:
                    1fr;

            }

        }

    `;


    const oldStyle =
        document.getElementById(
            "savedRoutineEditorStyles"
        );


    if(oldStyle){

        oldStyle.remove();

    }


    document.head.appendChild(
        style
    );


    modal.innerHTML = `

        <div
            class="saved-routine-editor-card"
            role="dialog"
            aria-modal="true"
        >

            <div
                class="saved-routine-editor-header"
            >

                <div>

                    <h2>
                        🏋️
                        ${escapeExerciseHTML(
                            routine.name
                        )}
                    </h2>

                </div>


                <button
                    type="button"
                    class="saved-routine-editor-close"
                    id="savedRoutineEditorClose"
                >
                    ×
                </button>

            </div>


            <p
                class="saved-routine-editor-days"
            >

                📅 Días:
                ${
                    Array.isArray(
                        routine.days
                    )
                        ? escapeExerciseHTML(
                            routine.days.join(
                                ", "
                            )
                        )
                        : "Sin días"
                }

            </p>


            <div
                id="savedRoutineExercises"
            >

                ${
                    exercises.length
                        ? exercises
                            .map(
                                (exercise,index) => {

                                    const sets =
                                        Number(
                                            exercise.sets
                                        ) || 3;

                                    const reps =
                                        Number(
                                            exercise.reps
                                        ) || 10;

                                    const weight =
                                        Number(
                                            exercise.weight
                                        ) || 0;

                                    const rest =
                                        Number(
                                            exercise.rest
                                        ) || 90;


                                    return `

                                        <div
                                            class="saved-routine-exercise"
                                            data-exercise-index="${index}"
                                        >

                                            <div
                                                class="saved-routine-exercise-title"
                                            >

                                                <span
                                                    class="saved-routine-exercise-number"
                                                >
                                                    ${index + 1}
                                                </span>


                                                <span
                                                    class="saved-routine-exercise-name"
                                                >

                                                    ${escapeExerciseHTML(
                                                        exercise.name
                                                    )}

                                                </span>

                                            </div>


                                            <div
                                                class="saved-routine-fields"
                                            >

                                                <div
                                                    class="saved-routine-field"
                                                >

                                                    <label>
                                                        SERIES
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="20"
                                                        step="1"
                                                        class="routine-field-sets"
                                                        value="${sets}"
                                                    >

                                                </div>


                                                <div
                                                    class="saved-routine-field"
                                                >

                                                    <label>
                                                        REPETICIONES
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="100"
                                                        step="1"
                                                        class="routine-field-reps"
                                                        value="${reps}"
                                                    >

                                                </div>


                                                <div
                                                    class="saved-routine-field"
                                                >

                                                    <label>
                                                        PESO (KG)
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        step="0.5"
                                                        class="routine-field-weight"
                                                        value="${weight}"
                                                    >

                                                </div>


                                                <div
                                                    class="saved-routine-field"
                                                >

                                                    <label>
                                                        DESCANSO (SEG)
                                                    </label>

                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="600"
                                                        step="5"
                                                        class="routine-field-rest"
                                                        value="${rest}"
                                                    >

                                                </div>

                                            </div>

                                        </div>

                                    `;

                                }
                            )
                            .join("")
                        : `

                            <p>
                                Esta rutina no tiene ejercicios.
                            </p>

                        `

                }

            </div>


            <div
                class="saved-routine-footer"
            >

                <button
                    type="button"
                    class="saved-routine-cancel"
                    id="savedRoutineEditorCancel"
                >
                    Cancelar
                </button>


                <button
                    type="button"
                    class="saved-routine-save"
                    id="savedRoutineEditorSave"
                >
                    💾 Guardar cambios
                </button>


                <button
                    type="button"
                    class="saved-routine-training"
                    id="savedRoutineStartTraining"
                >
                    🏋️ Iniciar entrenamiento
                </button>

            </div>

        </div>

    `;


    function closeEditor(){

        modal.remove();

    }


    modal.querySelector(
        "#savedRoutineEditorClose"
    ).addEventListener(
        "click",
        closeEditor
    );


    modal.querySelector(
        "#savedRoutineEditorCancel"
    ).addEventListener(
        "click",
        closeEditor
    );


    modal.addEventListener(
        "click",
        event => {

            if(
                event.target ===
                modal
            ){

                closeEditor();

            }

        }
    );


    modal.querySelector(
        "#savedRoutineStartTraining"
    ).addEventListener(
        "click",
        () => {

            modal.remove();

            startWorkoutMode(
                routine
            );

        }
    );


    modal.querySelector(
        "#savedRoutineEditorSave"
    ).addEventListener(
        "click",
        () => {

            const exerciseCards =
                modal.querySelectorAll(
                    ".saved-routine-exercise"
                );


            const updatedExercises =
                exercises.map(
                    (exercise,index) => {

                        const card =
                            exerciseCards[index];


                        if(!card){

                            return {
                                ...exercise
                            };

                        }


                        const setsInput =
                            card.querySelector(
                                ".routine-field-sets"
                            );


                        const repsInput =
                            card.querySelector(
                                ".routine-field-reps"
                            );


                        const weightInput =
                            card.querySelector(
                                ".routine-field-weight"
                            );


                        const restInput =
                            card.querySelector(
                                ".routine-field-rest"
                            );


                        const sets =
                            Math.max(
                                1,
                                Number(
                                    setsInput.value
                                ) || 1
                            );


                        const reps =
                            Math.max(
                                1,
                                Number(
                                    repsInput.value
                                ) || 1
                            );


                        const weight =
                            Math.max(
                                0,
                                Number(
                                    weightInput.value
                                ) || 0
                            );


                        const rest =
                            Math.max(
                                0,
                                Number(
                                    restInput.value
                                ) || 0
                            );


                        return {

                            ...exercise,

                            sets: sets,

                            reps: reps,

                            weight: weight,

                            rest: rest

                        };

                    }
                );


            const stored =
                localStorage.getItem(
                    "strongGymRoutines"
                );


            let routines = [];


            try{

                routines =
                    stored
                        ? JSON.parse(
                            stored
                        )
                        : [];

            }catch(error){

                console.error(
                    "Error leyendo rutinas:",
                    error
                );

                routines = [];

            }


            const routineIndex =
                routines.findIndex(
                    item =>
                        String(
                            item.id
                        ) ===
                        String(
                            routine.id
                        )
                );


            if(
                routineIndex === -1
            ){

                alert(
                    "No se encontró la rutina para guardar."
                );

                return;

            }


            routines[
                routineIndex
            ] = {

                ...routines[
                    routineIndex
                ],

                exercises:
                    updatedExercises

            };


            localStorage.setItem(
                "strongGymRoutines",
                JSON.stringify(
                    routines
                )
            );


            alert(
                `✅ Rutina "${routine.name}" actualizada correctamente.`
            );


            closeEditor();


            loadSavedRoutines();

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




/* =========================================================
   MODO ENTRENAMIENTO
   ========================================================= */

function startWorkoutMode(
    routine
){

    const workoutStartTime =
        Date.now();


    const exercises =
        Array.isArray(
            routine.exercises
        )
            ? routine.exercises
            : [];


    let modal =
        document.getElementById(
            "workoutModeModal"
        );


    if(modal){

        modal.remove();

    }


    modal =
        document.createElement(
            "div"
        );


    modal.id =
        "workoutModeModal";


    modal.className =
        "workout-mode-modal";


    document.body.appendChild(
        modal
    );


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "workoutModeStyles";


    style.textContent = `

        .workout-mode-modal{

            position:fixed;

            inset:0;

            z-index:1400;

            display:flex;

            align-items:flex-end;

            justify-content:center;

            padding:12px;

            background:
                rgba(17,24,39,.70);

            opacity:0;

            visibility:hidden;

            transition:
                opacity .2s ease,
                visibility .2s ease;

        }


        .workout-mode-modal.active{

            opacity:1;

            visibility:visible;

        }


        .workout-mode-card{

            width:100%;

            max-width:680px;

            max-height:94vh;

            overflow-y:auto;

            padding:22px;

            border-radius:
                28px
                28px
                18px
                18px;

            background:#ffffff;

            box-shadow:
                0 -12px 45px
                rgba(0,0,0,.25);

            transform:
                translateY(20px);

            transition:
                transform .2s ease;

        }


        .workout-mode-modal.active
        .workout-mode-card{

            transform:
                translateY(0);

        }


        .workout-mode-header{

            display:flex;

            align-items:flex-start;

            justify-content:space-between;

            gap:12px;

            margin-bottom:8px;

        }


        .workout-mode-header h2{

            margin:0;

            color:#111827;

            font-size:24px;

        }


        .workout-mode-info{

            margin:
                0
                0
                20px;

            color:#6b7280;

            font-size:13px;

        }


        .workout-mode-close{

            width:40px;

            height:40px;

            flex-shrink:0;

            border:none;

            border-radius:50%;

            background:#f3f4f6;

            color:#111827;

            font-size:24px;

            cursor:pointer;

        }


        .workout-mode-progress{

            margin-bottom:20px;

            padding:14px;

            border-radius:16px;

            background:#f9fafb;

            border:
                1px solid
                #e5e7eb;

        }


        .workout-mode-progress-title{

            display:flex;

            justify-content:space-between;

            margin-bottom:8px;

            color:#111827;

            font-size:13px;

            font-weight:800;

        }


        .workout-mode-progress-bar{

            width:100%;

            height:9px;

            overflow:hidden;

            border-radius:20px;

            background:#e5e7eb;

        }


        .workout-mode-progress-fill{

            width:0%;

            height:100%;

            border-radius:20px;

            background:
                var(--accent);

            transition:
                width .2s ease;

        }


        .workout-exercise{

            margin-bottom:14px;

            padding:16px;

            border:
                1px solid
                #e5e7eb;

            border-radius:18px;

        }


        .workout-exercise-header{

            display:flex;

            align-items:center;

            gap:10px;

            margin-bottom:14px;

        }


        .workout-exercise-number{

            display:flex;

            align-items:center;

            justify-content:center;

            width:30px;

            height:30px;

            border-radius:50%;

            background:
                var(--accent);

            color:#ffffff;

            font-size:12px;

            font-weight:800;

        }


        .workout-exercise-name{

            color:#111827;

            font-size:15px;

            font-weight:800;

        }


        .workout-set{

            display:grid;

            grid-template-columns:
                32px
                1fr
                1fr
                42px;

            align-items:center;

            gap:8px;

            margin-bottom:8px;

        }


        .workout-set-number{

            color:#6b7280;

            font-size:12px;

            font-weight:800;

            text-align:center;

        }


        .workout-set input{

            width:100%;

            min-height:40px;

            box-sizing:border-box;

            padding:
                7px
                9px;

            border:
                1px solid
                #e5e7eb;

            border-radius:10px;

            font-size:13px;

            font-weight:700;

        }


        .workout-set-complete{

            width:40px;

            height:40px;

            border:
                1px solid
                #e5e7eb;

            border-radius:10px;

            background:#ffffff;

            cursor:pointer;

        }


        .workout-set-complete.active{

            border-color:
                var(--accent);

            background:
                var(--accent);

            color:#ffffff;

        }


        .workout-mode-footer{

            display:flex;

            gap:10px;

            margin-top:20px;

        }


        .workout-mode-footer button{

            flex:1;

            min-height:50px;

            border:none;

            border-radius:14px;

            font-size:14px;

            font-weight:800;

            cursor:pointer;

        }


        .workout-mode-finish{

            background:
                var(--accent);

            color:#ffffff;

        }


        .workout-mode-exit{

            background:#f3f4f6;

            color:#111827;

        }

    `;


    document.head.appendChild(
        style
    );


    const totalSets =
        exercises.reduce(
            (
                total,
                exercise
            ) =>
                total +
                (
                    Number(
                        exercise.sets
                    ) || 1
                ),
            0
        );


    modal.innerHTML = `

        <div
            class="workout-mode-card"
            role="dialog"
            aria-modal="true"
        >

            <div
                class="workout-mode-header"
            >

                <h2>
                    🏋️
                    ${escapeExerciseHTML(
                        routine.name
                    )}
                </h2>


                <button
                    type="button"
                    class="workout-mode-close"
                    id="workoutModeClose"
                >
                    ×
                </button>

            </div>


            <p
                class="workout-mode-info"
            >

                📅
                ${
                    Array.isArray(
                        routine.days
                    )
                        ? escapeExerciseHTML(
                            routine.days.join(
                                ", "
                            )
                        )
                        : ""
                }

            </p>


            <div
                class="workout-mode-progress"
            >

                <div
                    class="workout-mode-progress-title"
                >

                    <span>
                        Progreso
                    </span>

                    <span
                        id="workoutProgressText"
                    >
                        0 / ${totalSets} series
                    </span>

                </div>


                <div
                    class="workout-mode-progress-bar"
                >

                    <div
                        class="workout-mode-progress-fill"
                        id="workoutProgressFill"
                    ></div>

                </div>

            </div>


            <div
                id="workoutExerciseList"
            >

                ${
                    exercises
                        .map(
                            (
                                exercise,
                                exerciseIndex
                            ) => {

                                const sets =
                                    Math.max(
                                        1,
                                        Number(
                                            exercise.sets
                                        ) || 1
                                    );

                                const reps =
                                    Math.max(
                                        1,
                                        Number(
                                            exercise.reps
                                        ) || 10
                                    );

                                const weight =
                                    Math.max(
                                        0,
                                        Number(
                                            exercise.weight
                                        ) || 0
                                    );


                                


                                const savedProgress =
                                    Array.isArray(
                                        exercise.workoutProgress
                                    )
                                        ? exercise.workoutProgress
                                        : [];

return `

                                    <div
                                        class="workout-exercise"
                                    >

                                        <div
                                            class="workout-exercise-header"
                                        >

                                            <span
                                                class="workout-exercise-number"
                                            >
                                                ${
                                                    exerciseIndex + 1
                                                }
                                            </span>


                                            <span
                                                class="workout-exercise-name"
                                            >

                                                ${escapeExerciseHTML(
                                                    exercise.name
                                                )}

                                            </span>

                                        </div>


                                        ${
                                            Array.from(
                                                {
                                                    length:
                                                        sets
                                                },
                                                (
                                                    _,
                                                    setIndex
                                                ) => `

                                                    <div
                                                        class="workout-set"
                                                        data-exercise-index="${exerciseIndex}"
                                                        data-set-index="${setIndex}"
                                                    >

                                                        <span
                                                            class="workout-set-number"
                                                        >

                                                            ${
                                                                setIndex + 1
                                                            }

                                                        </span>


                                                        <input
                                                            type="number"
                                                            min="0"
                                                            step="0.5"
                                                            class="workout-weight"
                                                            value="${
                                                                  savedProgress[setIndex]
                                                                      ? Number(
                                                                          savedProgress[setIndex].weight
                                                                      ) || 0
                                                                      : weight
                                                              }"
                                                            placeholder="kg"
                                                        >


                                                        <input
                                                            type="number"
                                                            min="1"
                                                            step="1"
                                                            class="workout-reps"
                                                            value="${
                                                                  savedProgress[setIndex]
                                                                      ? Number(
                                                                          savedProgress[setIndex].reps
                                                                      ) || reps
                                                                      : reps
                                                              }"
                                                            placeholder="reps"
                                                        >


                                                        <button
                                                            type="button"
                                                            class="workout-set-complete ${
                                                                  savedProgress[setIndex] &&
                                                                  savedProgress[setIndex].completed
                                                                      ? "active"
                                                                      : ""
                                                              }"
                                                              aria-label="Completar serie"
                                                        >

                                                            ✓

                                                        </button>

                                                    </div>

                                                `
                                            ).join("")
                                        }

                                    </div>

                                `;

                            }
                        )
                        .join("")
                }

            </div>


            <div
                class="workout-mode-footer"
            >

                <button
                    type="button"
                    class="workout-mode-exit"
                    id="workoutModeExit"
                >
                    Salir
                </button>


                <button
                    type="button"
                    class="workout-mode-finish"
                    id="workoutModeFinish"
                >
                    🏁 Finalizar entrenamiento
                </button>

            </div>

        </div>

    `;


    function updateWorkoutProgress(){

        const completed =
            modal.querySelectorAll(
                ".workout-set-complete.active"
            ).length;


        const percentage =
            totalSets > 0
                ? (
                    completed /
                    totalSets
                ) * 100
                : 0;


        modal.querySelector(
            "#workoutProgressText"
        ).textContent =
            `${completed} / ${totalSets} series`;


        modal.querySelector(
            "#workoutProgressFill"
        ).style.width =
            `${percentage}%`;

    }


    modal.querySelectorAll(
        ".workout-set-complete"
    ).forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "active"
                    );

                    updateWorkoutProgress();

                }
            );

        }
    );


    function closeWorkout(){

        modal.remove();

    }


    modal.querySelector(
        "#workoutModeClose"
    ).addEventListener(
        "click",
        closeWorkout
    );


    modal.querySelector(
        "#workoutModeExit"
    ).addEventListener(
        "click",
        closeWorkout
    );


    modal.addEventListener(
        "click",
        event => {

            if(
                event.target ===
                modal
            ){

                closeWorkout();

            }

        }
    );


    modal.querySelector(
        "#workoutModeFinish"
    ).addEventListener(
        "click",
        () => {

            const completedButtons =
                modal.querySelectorAll(
                    ".workout-set-complete.active"
                );


            const completed =
                completedButtons.length;


            if(
                completed === 0
            ){

                alert(
                    "Completá al menos una serie antes de finalizar."
                );

                return;

            }


            const workoutExercises =
                [];


            modal.querySelectorAll(
                ".workout-exercise"
            ).forEach(
                (
                    exerciseCard,
                    exerciseIndex
                ) => {

                    const sourceExercise =
                        exercises[
                            exerciseIndex
                        ];


                    const sets =
                        [];


                    exerciseCard
                        .querySelectorAll(
                            ".workout-set"
                        )
                        .forEach(
                            (
                                setRow,
                                setIndex
                            ) => {

                                const weightInput =
                                    setRow.querySelector(
                                        ".workout-weight"
                                    );


                                const repsInput =
                                    setRow.querySelector(
                                        ".workout-reps"
                                    );


                                const completeButton =
                                    setRow.querySelector(
                                        ".workout-set-complete"
                                    );


                                sets.push({

                                    set:
                                        setIndex + 1,

                                    weight:
                                        Number(
                                            weightInput.value
                                        ) || 0,

                                    reps:
                                        Number(
                                            repsInput.value
                                        ) || 0,

                                    completed:
                                        completeButton
                                            .classList
                                            .contains(
                                                "active"
                                            )

                                });

                            }
                        );


                    workoutExercises.push({

                        id:
                            sourceExercise
                                ? sourceExercise.id
                                : null,

                        name:
                            sourceExercise
                                ? sourceExercise.name
                                : "Ejercicio",

                        sets:
                            sets

                    });

                }
            );


            const percentage =
                totalSets > 0
                    ? Math.round(
                        (
                            completed /
                            totalSets
                        ) * 100
                    )
                    : 0;


            const workoutEndTime =
                Date.now();


            const durationSeconds =
                Math.max(
                    0,
                    Math.round(
                        (
                            workoutEndTime -
                            workoutStartTime
                        ) / 1000
                    )
                );


            const durationMinutes =
                Math.round(
                    durationSeconds / 60
                );


            const workoutRecord = {

                id:
                    Date.now(),

                routineId:
                    routine.id,

                routineName:
                    routine.name,

                date:
                    new Date().toISOString(),

                days:
                    Array.isArray(
                        routine.days
                    )
                        ? [
                            ...routine.days
                        ]
                        : [],

                totalSets:
                    totalSets,

                completedSets:
                    completed,

                percentage:
                    percentage,

                durationSeconds:
                    durationSeconds,

                durationMinutes:
                    durationMinutes,

                exercises:
                    workoutExercises

            };


            const storageKey =
                "strongGymWorkoutHistory";


            const storedHistory =
                localStorage.getItem(
                    storageKey
                );


            let history = [];


            try{

                history =
                    storedHistory
                        ? JSON.parse(
                            storedHistory
                        )
                        : [];

            }catch(error){

                console.error(
                    "Error leyendo historial:",
                    error
                );

                history = [];

            }


            if(
                !Array.isArray(
                    history
                )
            ){

                history = [];

            }


            history.unshift(
                workoutRecord
            );


            localStorage.setItem(
                storageKey,
                JSON.stringify(
                    history
                )
            );


            /* =================================================
               GUARDAR PROGRESO EN LA RUTINA
               ================================================= */

            try {

                const routinesKey =
                    "strongGymRoutines";


                const routinesData =
                    localStorage.getItem(
                        routinesKey
                    );


                let routines =
                    routinesData
                        ? JSON.parse(
                            routinesData
                        )
                        : [];


                if (
                    !Array.isArray(
                        routines
                    )
                ) {

                    routines = [];

                }


                const routineIndex =
                    routines.findIndex(
                        item =>
                            String(
                                item.id
                            ) ===
                            String(
                                routine.id
                            )
                    );


                if (
                    routineIndex !== -1
                ) {

                    const savedRoutine =
                        routines[
                            routineIndex
                        ];


                    const savedExercises =
                        Array.isArray(
                            savedRoutine.exercises
                        )
                            ? savedRoutine.exercises
                            : [];


                    const updatedExercises =
                        savedExercises.map(
                            (
                                exercise,
                                exerciseIndex
                            ) => {

                                const performed =
                                    workoutExercises[
                                        exerciseIndex
                                    ];


                                if (
                                    !performed
                                ) {

                                    return exercise;

                                }


                                return {

                                    ...exercise,

                                    workoutProgress:
                                        performed.sets.map(
                                            set => ({

                                                set:
                                                    set.set,

                                                weight:
                                                    set.weight,

                                                reps:
                                                    set.reps,

                                                completed:
                                                    set.completed

                                            })
                                        )

                                };

                            }
                        );


                    routines[
                        routineIndex
                    ] = {

                        ...savedRoutine,

                        exercises:
                            updatedExercises,

                        lastWorkout: {

                            date:
                                new Date()
                                    .toISOString(),

                            completedSets:
                                completed,

                            totalSets:
                                totalSets,

                            percentage:
                                percentage

                        },

                        updatedAt:
                            new Date()
                                .toISOString()

                    };


                    localStorage.setItem(
                        routinesKey,
                        JSON.stringify(
                            routines
                        )
                    );

                }

            } catch (error) {

                console.error(
                    "Error guardando progreso de rutina:",
                    error
                );

            }


            alert(
                `🏁 Entrenamiento guardado.\n\n${routine.name}\n\nSeries completadas: ${completed} de ${totalSets} (${percentage}%).`
            );


            closeWorkout();

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
   HISTORIAL DE ENTRENAMIENTOS
   ========================================================= */

function loadWorkoutHistory(){

    const historyList =
        document.getElementById(
            "workoutHistoryList"
        );


    if(!historyList){

        return;

    }


    const storageKey =
        "strongGymWorkoutHistory";


    let history = [];


    try{

        const stored =
            localStorage.getItem(
                storageKey
            );


        history =
            stored
                ? JSON.parse(
                    stored
                )
                : [];


    }catch(error){

        console.error(
            "Error cargando historial:",
            error
        );


        history = [];

    }


    if(
        !Array.isArray(history) ||
        history.length === 0
    ){

        historyList.innerHTML = `

            <div class="empty-state">

                <span>
                    📊
                </span>

                <h3>
                    Todavía no hay entrenamientos
                </h3>

                <p>
                    Cuando finalices un entrenamiento,
                    aparecerá aquí.
                </p>

            </div>

        `;

        return;

    }


    historyList.innerHTML = "";


    history.forEach(
        (
            workout,
            index
        ) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "workout-history-card";


            const date =
                workout.date
                    ? new Date(
                        workout.date
                    ).toLocaleDateString(
                        "es-AR",
                        {
                            day:
                                "2-digit",

                            month:
                                "2-digit",

                            year:
                                "numeric"
                        }
                    )
                    : "Sin fecha";


            const completed =
                Number(
                    workout.completedSets
                ) || 0;


            const total =
                Number(
                    workout.totalSets
                ) || 0;


            const percentage =
                Number(
                    workout.percentage
                ) || 0;


            card.innerHTML = `

                <div
                    class="workout-history-header"
                >

                    <div>

                        <span
                            class="workout-history-date"
                        >
                            📅 ${date}
                        </span>

                        <h3>
                            ${escapeExerciseHTML(
                                workout.routineName ||
                                "Entrenamiento"
                            )}
                        </h3>

                    </div>

                    <span
                        class="workout-history-percentage"
                    >
                        ${percentage}%
                    </span>

                </div>


                <div
                    class="workout-history-stats"
                >

                    <span>
                        🏋️
                        ${completed}
                        / ${total}
                        series
                    </span>

                </div>


                <div
                    class="workout-history-progress"
                >

                    <div
                        class="workout-history-progress-fill"
                        style="
                            width:${percentage}%;
                        "
                    ></div>

                </div>


                <div
                    class="workout-history-actions"
                >

                    <button
                        type="button"
                        class="history-view-button"
                        data-history-index="${index}"
                    >
                        ▶ Ver detalle
                    </button>


                    <button
                        type="button"
                        class="history-delete-button"
                        data-history-index="${index}"
                    >
                        🗑 Eliminar
                    </button>

                </div>

            `;


            historyList.appendChild(
                card
            );

        }
    );


    historyList
        .querySelectorAll(
            ".history-view-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset
                                    .historyIndex
                            );


                        showWorkoutHistoryDetail(
                            history[index]
                        );

                    }
                );

            }
        );


    historyList
        .querySelectorAll(
            ".history-delete-button"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const index =
                            Number(
                                button.dataset
                                    .historyIndex
                            );


                        deleteWorkoutHistory(
                            index
                        );

                    }
                );

            }
        );

}


/* =========================================================
   DETALLE DEL ENTRENAMIENTO
   ========================================================= */

function showWorkoutHistoryDetail(
    workout
){

    if(!workout){

        return;

    }


    const exercises =
        Array.isArray(
            workout.exercises
        )
            ? workout.exercises
            : [];


    let modal =
        document.getElementById(
            "workoutHistoryDetailModal"
        );


    if(modal){

        modal.remove();

    }


    modal =
        document.createElement(
            "div"
        );


    modal.id =
        "workoutHistoryDetailModal";


    modal.className =
        "workout-history-detail-modal";


    const date =
        workout.date
            ? new Date(
                workout.date
            ).toLocaleString(
                "es-AR"
            )
            : "Sin fecha";


    modal.innerHTML = `

        <div
            class="workout-history-detail-card"
        >

            <div
                class="workout-history-detail-header"
            >

                <div>

                    <span>
                        ${date}
                    </span>

                    <h2>
                        ${escapeExerciseHTML(
                            workout.routineName ||
                            "Entrenamiento"
                        )}
                    </h2>

                </div>


                <button
                    type="button"
                    id="workoutHistoryDetailClose"
                >
                    ✕
                </button>

            </div>


            <div
                class="workout-history-summary"
            >

                <div>

                    <strong>
                        ${Number(
                            workout.completedSets
                        ) || 0}
                    </strong>

                    <span>
                        Series completadas
                    </span>

                </div>


                <div>

                    <strong>
                        ${Number(
                            workout.totalSets
                        ) || 0}
                    </strong>

                    <span>
                        Series totales
                    </span>

                </div>


                <div>

                    <strong>
                        ${Number(
                            workout.percentage
                        ) || 0}%
                    </strong>

                    <span>
                        Progreso
                    </span>

                </div>

            </div>


            <div
                class="workout-history-detail-exercises"
            >

                ${
                    exercises.length
                        ? exercises
                            .map(
                                (
                                    exercise,
                                    exerciseIndex
                                ) => {

                                    const sets =
                                        Array.isArray(
                                            exercise.sets
                                        )
                                            ? exercise.sets
                                            : [];


                                    return `

                                        <div
                                            class="history-exercise-card"
                                        >

                                            <h3>
                                                ${
                                                    exerciseIndex + 1
                                                }.
                                                ${escapeExerciseHTML(
                                                    exercise.name ||
                                                    "Ejercicio"
                                                )}
                                            </h3>


                                            <div
                                                class="history-sets"
                                            >

                                                ${
                                                    sets.length
                                                        ? sets
                                                            .map(
                                                                set => `

                                                                    <div
                                                                        class="history-set-row ${
                                                                            set.completed
                                                                                ? "completed"
                                                                                : ""
                                                                        }"
                                                                    >

                                                                        <span>
                                                                            Serie ${Number(
                                                                                set.set
                                                                            ) || 0}
                                                                        </span>

                                                                        <span>
                                                                            ${
                                                                                Number(
                                                                                    set.weight
                                                                                ) || 0
                                                                            } kg
                                                                        </span>

                                                                        <span>
                                                                            ${
                                                                                Number(
                                                                                    set.reps
                                                                                ) || 0
                                                                            } reps
                                                                        </span>

                                                                        <span>
                                                                            ${
                                                                                set.completed
                                                                                    ? "✓"
                                                                                    : "—"
                                                                            }
                                                                        </span>

                                                                    </div>

                                                                `
                                                            )
                                                            .join("")
                                                        : `
                                                            <p>
                                                                Sin datos de series.
                                                            </p>
                                                        `
                                                }

                                            </div>

                                        </div>

                                    `;

                                }
                            )
                            .join("")
                        : `
                            <div
                                class="empty-state"
                            >

                                <span>
                                    📋
                                </span>

                                <p>
                                    Este entrenamiento
                                    no tiene ejercicios registrados.
                                </p>

                            </div>
                        `
                }

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    const closeButton =
        document.getElementById(
            "workoutHistoryDetailClose"
        );


    closeButton.addEventListener(
        "click",
        () => {

            modal.remove();

        }
    );


    modal.addEventListener(
        "click",
        event => {

            if(
                event.target === modal
            ){

                modal.remove();

            }

        }
    );


}


/* =========================================================
   ELIMINAR ENTRENAMIENTO DEL HISTORIAL
   ========================================================= */

function deleteWorkoutHistory(
    index
){

    const storageKey =
        "strongGymWorkoutHistory";


    let history = [];


    try{

        history =
            JSON.parse(
                localStorage.getItem(
                    storageKey
                ) || "[]"
            );


    }catch(error){

        console.error(
            "Error leyendo historial:",
            error
        );


        history = [];

    }


    if(
        !Array.isArray(history) ||
        !history[index]
    ){

        return;

    }


    const workout =
        history[index];


    const confirmed =
        confirm(
            `¿Querés eliminar el entrenamiento "${workout.routineName || "Entrenamiento"}"?`
        );


    if(!confirmed){

        return;

    }


    history.splice(
        index,
        1
    );


    localStorage.setItem(
        storageKey,
        JSON.stringify(
            history
        )
    );


    loadWorkoutHistory();

}


/* =========================================================
   ESTILOS DEL HISTORIAL
   ========================================================= */

function installWorkoutHistoryStyles(){

    if(
        document.getElementById(
            "workoutHistoryStyles"
        )
    ){

        return;

    }


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "workoutHistoryStyles";


    style.textContent = `

        .workout-history-list{
            display:flex;
            flex-direction:column;
            gap:16px;
        }


        .workout-history-card{
            background:#ffffff;
            border-radius:18px;
            padding:18px;
            box-shadow:
                0 8px 24px
                rgba(0,0,0,.08);
        }


        .workout-history-header{
            display:flex;
            align-items:flex-start;
            justify-content:space-between;
            gap:16px;
        }


        .workout-history-date{
            font-size:.82rem;
            opacity:.65;
        }


        .workout-history-header h3{
            margin:6px 0 0;
        }


        .workout-history-percentage{
            font-size:1.2rem;
            font-weight:700;
        }


        .workout-history-stats{
            margin-top:14px;
            font-size:.95rem;
        }


        .workout-history-progress{
            height:8px;
            margin-top:12px;
            border-radius:999px;
            background:#e5e7eb;
            overflow:hidden;
        }


        .workout-history-progress-fill{
            height:100%;
            background:#111827;
        }


        .workout-history-actions{
            display:flex;
            gap:10px;
            margin-top:16px;
            flex-wrap:wrap;
        }


        .history-view-button,
        .history-delete-button{
            border:0;
            border-radius:10px;
            padding:10px 14px;
            cursor:pointer;
        }


        .history-view-button{
            background:#111827;
            color:#ffffff;
        }


        .history-delete-button{
            background:#f3f4f6;
            color:#111827;
        }


        .workout-history-detail-modal{
            position:fixed;
            inset:0;
            z-index:2000;
            display:flex;
            align-items:center;
            justify-content:center;
            padding:16px;
            background:rgba(0,0,0,.65);
        }


        .workout-history-detail-card{
            width:min(
                720px,
                100%
            );
            max-height:90vh;
            overflow:auto;
            background:#ffffff;
            border-radius:20px;
            padding:20px;
        }


        .workout-history-detail-header{
            display:flex;
            justify-content:space-between;
            gap:16px;
        }


        .workout-history-detail-header button{
            border:0;
            background:#f3f4f6;
            border-radius:10px;
            width:40px;
            height:40px;
            cursor:pointer;
        }


        .workout-history-summary{
            display:grid;
            grid-template-columns:
                repeat(
                    3,
                    1fr
                );
            gap:10px;
            margin:20px 0;
        }


        .workout-history-summary div{
            background:#f3f4f6;
            border-radius:14px;
            padding:14px;
            text-align:center;
        }


        .workout-history-summary strong{
            display:block;
            font-size:1.3rem;
        }


        .workout-history-summary span{
            display:block;
            font-size:.78rem;
            margin-top:4px;
        }


        .history-exercise-card{
            border-top:1px solid #e5e7eb;
            padding:16px 0;
        }


        .history-set-row{
            display:grid;
            grid-template-columns:
                1fr
                1fr
                1fr
                40px;
            gap:8px;
            align-items:center;
            padding:9px 0;
            border-bottom:1px solid #f0f0f0;
        }


        .history-set-row.completed{
            font-weight:700;
        }


        @media(
            max-width:600px
        ){

            .workout-history-summary{
                grid-template-columns:
                    1fr
                    1fr
                    1fr;
            }


            .history-set-row{
                font-size:.85rem;
            }

        }

    `;


    document.head.appendChild(
        style
    );

}


/* =========================================================
   INICIALIZAR HISTORIAL
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        installWorkoutHistoryStyles();

        loadWorkoutHistory();

    }
);


/* =========================================================
   ACTUALIZAR HISTORIAL AL ENTRAR
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                '[data-section="historySection"]'
            );


        if(
            button
        ){

            setTimeout(
                () => {

                    loadWorkoutHistory();

                },
                50
            );

        }

    }
);



/* =========================================================
   ESTADÍSTICAS REALES DE MI PROGRESO
   ========================================================= */

function updateProgressStatistics(){

    const workoutsElement =
        document.getElementById(
            "progressWorkouts"
        );

    const activeDaysElement =
        document.getElementById(
            "progressActiveDays"
        );

    const bestMarkElement =
        document.getElementById(
            "progressBestMark"
        );

    const trainingTimeElement =
        document.getElementById(
            "progressTrainingTime"
        );


    if(
        !workoutsElement ||
        !activeDaysElement ||
        !bestMarkElement ||
        !trainingTimeElement
    ){

        return;

    }


    const storageKey =
        "strongGymWorkoutHistory";


    let history = [];


    try{

        const storedHistory =
            localStorage.getItem(
                storageKey
            );


        history =
            storedHistory
                ? JSON.parse(
                    storedHistory
                )
                : [];


    }catch(error){

        console.error(
            "Error leyendo estadísticas:",
            error
        );


        history = [];

    }


    if(
        !Array.isArray(history)
    ){

        history = [];

    }


    /* =====================================================
       ENTRENAMIENTOS
       ===================================================== */

    workoutsElement.textContent =
        history.length;


    /* =====================================================
       DÍAS ACTIVOS
       ===================================================== */

    const activeDays =
        new Set();


    history.forEach(
        workout => {

            if(
                !workout ||
                !workout.date
            ){

                return;

            }


            const date =
                new Date(
                    workout.date
                );


            if(
                Number.isNaN(
                    date.getTime()
                )
            ){

                return;

            }


            activeDays.add(
                date.toLocaleDateString(
                    "es-AR"
                )
            );

        }
    );


    activeDaysElement.textContent =
        activeDays.size;


    /* =====================================================
       MEJOR MARCA
       ===================================================== */

    let bestMark = 0;


    history.forEach(
        workout => {

            const exercises =
                Array.isArray(
                    workout.exercises
                )
                    ? workout.exercises
                    : [];


            exercises.forEach(
                exercise => {

                    const sets =
                        Array.isArray(
                            exercise.sets
                        )
                            ? exercise.sets
                            : [];


                    sets.forEach(
                        set => {

                            const weight =
                                Number(
                                    set.weight
                                ) || 0;


                            if(
                                weight >
                                bestMark
                            ){

                                bestMark =
                                    weight;

                            }

                        }
                    );

                }
            );

        }
    );


    bestMarkElement.textContent =
        `${bestMark} kg`;


    /* =====================================================
       TIEMPO DE ENTRENAMIENTO
       =====================================================

       El sistema actual todavía no guarda duración.
       Por eso mostramos 0 min hasta implementar
       el cronómetro real.
       */

    let totalMinutes = 0;


    history.forEach(
        workout => {

            if(
                workout.durationMinutes
            ){

                totalMinutes +=
                    Number(
                        workout.durationMinutes
                    ) || 0;

            }

        }
    );


    trainingTimeElement.textContent =
        `${Math.round(
            totalMinutes
        )} min`;

}


/* =========================================================
   ACTUALIZAR PROGRESO AL INICIAR LA APLICACIÓN
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateProgressStatistics();

    }
);


/* =========================================================
   ACTUALIZAR PROGRESO AL ENTRAR EN LA SECCIÓN
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                '[data-section="progressSection"]'
            );


        if(
            button
        ){

            setTimeout(
                () => {

                    updateProgressStatistics();

                },
                50
            );

        }

    }
);



/* =========================================================
   GRÁFICO REAL DE EVOLUCIÓN
   ========================================================= */

function drawWorkoutProgressChart(){

    const canvas =
        document.getElementById(
            "workoutProgressChart"
        );

    const emptyState =
        document.getElementById(
            "progressChartEmpty"
        );


    if(
        !canvas ||
        !emptyState
    ){

        return;

    }


    const storageKey =
        "strongGymWorkoutHistory";


    let history = [];


    try{

        const stored =
            localStorage.getItem(
                storageKey
            );


        history =
            stored
                ? JSON.parse(
                    stored
                )
                : [];


    }catch(error){

        console.error(
            "Error cargando datos del gráfico:",
            error
        );


        history = [];

    }


    if(
        !Array.isArray(history)
    ){

        history = [];

    }


    /*
     * Orden cronológico.
     */

    history =
        history
            .filter(
                workout =>
                    workout &&
                    workout.date
            )
            .slice()
            .reverse();


    if(
        history.length === 0
    ){

        canvas.style.display =
            "none";

        emptyState.style.display =
            "block";

        return;

    }


    canvas.style.display =
        "block";

    emptyState.style.display =
        "none";


    const container =
        canvas.parentElement;


    const width =
        Math.max(
            300,
            container.clientWidth || 600
        );


    const height =
        280;


    const ratio =
        window.devicePixelRatio || 1;


    canvas.width =
        width * ratio;


    canvas.height =
        height * ratio;


    canvas.style.width =
        `${width}px`;


    canvas.style.height =
        `${height}px`;


    const ctx =
        canvas.getContext(
            "2d"
        );


    ctx.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );


    /*
     * Márgenes.
     */

    const padding = {
        top: 30,
        right: 20,
        bottom: 50,
        left: 45
    };


    const chartWidth =
        width -
        padding.left -
        padding.right;


    const chartHeight =
        height -
        padding.top -
        padding.bottom;


    /*
     * Valores.
     */

    const values =
        history.map(
            workout =>
                Math.max(
                    0,
                    Math.min(
                        100,
                        Number(
                            workout.percentage
                        ) || 0
                    )
                )
        );


    const maxValue =
        100;


    /*
     * Fondo.
     */

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    /*
     * Líneas horizontales.
     */

    ctx.font =
        "12px Arial";


    ctx.textAlign =
        "right";


    ctx.textBaseline =
        "middle";


    for(
        let step = 0;
        step <= 100;
        step += 25
    ){

        const y =
            padding.top +
            chartHeight -
            (
                step /
                maxValue
            ) *
            chartHeight;


        ctx.beginPath();

        ctx.moveTo(
            padding.left,
            y
        );

        ctx.lineTo(
            width -
            padding.right,
            y
        );

        ctx.strokeStyle =
            "#e5e7eb";

        ctx.lineWidth =
            1;

        ctx.stroke();


        ctx.fillStyle =
            "#6b7280";

        ctx.fillText(
            `${step}%`,
            padding.left - 8,
            y
        );

    }


    /*
     * Coordenadas de los puntos.
     */

    const points =
        values.map(
            (
                value,
                index
            ) => {

                const x =
                    history.length === 1
                        ? padding.left +
                          chartWidth / 2
                        : padding.left +
                          (
                              index /
                              (
                                  history.length - 1
                              )
                          ) *
                          chartWidth;


                const y =
                    padding.top +
                    chartHeight -
                    (
                        value /
                        maxValue
                    ) *
                    chartHeight;


                return {
                    x,
                    y,
                    value
                };

            }
        );


    /*
     * Área bajo la línea.
     */

    if(
        points.length > 1
    ){

        ctx.beginPath();

        ctx.moveTo(
            points[0].x,
            padding.top +
            chartHeight
        );


        points.forEach(
            point => {

                ctx.lineTo(
                    point.x,
                    point.y
                );

            }
        );


        ctx.lineTo(
            points[points.length - 1].x,
            padding.top +
            chartHeight
        );


        ctx.closePath();


        ctx.fillStyle =
            "rgba(17,24,39,.08)";

        ctx.fill();

    }


    /*
     * Línea de evolución.
     */

    if(
        points.length > 1
    ){

        ctx.beginPath();

        points.forEach(
            (
                point,
                index
            ) => {

                if(
                    index === 0
                ){

                    ctx.moveTo(
                        point.x,
                        point.y
                    );

                }else{

                    ctx.lineTo(
                        point.x,
                        point.y
                    );

                }

            }
        );


        ctx.strokeStyle =
            "#111827";

        ctx.lineWidth =
            3;

        ctx.lineJoin =
            "round";

        ctx.lineCap =
            "round";

        ctx.stroke();

    }


    /*
     * Puntos.
     */

    points.forEach(
        point => {

            ctx.beginPath();

            ctx.arc(
                point.x,
                point.y,
                5,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                "#ffffff";

            ctx.fill();


            ctx.strokeStyle =
                "#111827";

            ctx.lineWidth =
                2;

            ctx.stroke();

        }
    );


    /*
     * Porcentaje sobre cada punto.
     */

    points.forEach(
        point => {

            ctx.fillStyle =
                "#111827";

            ctx.font =
                "bold 12px Arial";

            ctx.textAlign =
                "center";

            ctx.textBaseline =
                "bottom";

            ctx.fillText(
                `${point.value}%`,
                point.x,
                point.y - 10
            );

        }
    );


    /*
     * Fechas.
     */

    ctx.fillStyle =
        "#6b7280";

    ctx.font =
        "11px Arial";

    ctx.textAlign =
        "center";

    ctx.textBaseline =
        "top";


    const maxLabels =
        Math.min(
            history.length,
            6
        );


    const step =
        history.length <= maxLabels
            ? 1
            : Math.ceil(
                history.length /
                maxLabels
            );


    history.forEach(
        (
            workout,
            index
        ) => {

            if(
                index % step !== 0 &&
                index !==
                    history.length - 1
            ){

                return;

            }


            const point =
                points[index];


            const date =
                new Date(
                    workout.date
                );


            const label =
                Number.isNaN(
                    date.getTime()
                )
                    ? ""
                    : date.toLocaleDateString(
                        "es-AR",
                        {
                            day:
                                "2-digit",
                            month:
                                "2-digit"
                        }
                    );


            ctx.fillText(
                label,
                point.x,
                padding.top +
                chartHeight +
                12
            );

        }
    );


    /*
     * Si hay un solo entrenamiento,
     * mostramos también el porcentaje.
     */

    if(
        points.length === 1
    ){

        ctx.fillStyle =
            "#111827";

        ctx.font =
            "bold 13px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "bottom";


        ctx.fillText(
            `${points[0].value}%`,
            points[0].x,
            points[0].y - 10
        );

    }

}


/* =========================================================
   ACTUALIZAR GRÁFICO AL ENTRAR EN MI PROGRESO
   ========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                '[data-section="progressSection"]'
            );


        if(
            button
        ){

            setTimeout(
                () => {

                    drawWorkoutProgressChart();

                },
                100
            );

        }

    }
);


/* =========================================================
   REDIBUJAR AL CAMBIAR EL TAMAÑO
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        const canvas =
            document.getElementById(
                "workoutProgressChart"
            );


        if(
            canvas &&
            canvas.style.display !==
                "none"
        ){

            drawWorkoutProgressChart();

        }

    }
);


/* =========================================================
   DIBUJAR AL CARGAR
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setTimeout(
            () => {

                drawWorkoutProgressChart();

            },
            100
        );

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