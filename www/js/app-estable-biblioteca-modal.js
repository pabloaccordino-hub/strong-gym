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