document.addEventListener('DOMContentLoaded', function () {
    // Definición de los datos de la malla curricular
    // NOTA: Se asignaron códigos a ramos que no lo tenían explícito en el PDF para su identificación.
    const courseData = [
        // Semestre 1
        { code: "72000", name: "Introducción a las Ciencias de la Salud y RHB", semester: 1, prereqs: [] },
        { code: "72001", name: "Matemática", semester: 1, prereqs: [] },
        { code: "72002", name: "Biología Celular", semester: 1, prereqs: [] },
        { code: "72003", name: "Química General", semester: 1, prereqs: [] },
        { code: "72004", name: "Anatomía Humana I", semester: 1, prereqs: [] },
        { code: "CI-I", name: "Curso Transversal Institucional I", semester: 1, prereqs: [] },
        // Semestre 2
        { code: "72005", name: "Bioquímica", semester: 2, prereqs: ["72003"] },
        { code: "72006", name: "Física", semester: 2, prereqs: ["72001"] },
        { code: "72007", name: "Anatomía Humana II y Neuroanatomía", semester: 2, prereqs: ["72004"] },
        { code: "72008", name: "Histología y Embriología", semester: 2, prereqs: ["72002"] },
        { code: "72009", name: "Historia y Filosofía de la Salud", semester: 2, prereqs: ["72000"] },
        { code: "3638", name: "Inglés I", semester: 2, prereqs: [] },
        // Semestre 3
        { code: "72010", name: "Biomecánica I: Fisiología Articular y Artrokinemática", semester: 3, prereqs: ["72006"] },
        { code: "72011", name: "Ergonomía y Salud Ocupacional", semester: 3, prereqs: ["72009"] },
        { code: "72012", name: "Psicología Aplicada", semester: 3, prereqs: ["72000"] },
        { code: "72013", name: "Fisiología", semester: 3, prereqs: ["72008", "72007"] },
        { code: "72014", name: "Biofísica", semester: 3, prereqs: ["72006"] },
        { code: "3639", name: "Inglés II", semester: 3, prereqs: ["3638"] },
        // Semestre 4
        { code: "72015", name: "Biomecánica II: Movimiento Humano", semester: 4, prereqs: ["72010", "72014"] },
        { code: "72016", name: "Alimentación y Nutrición", semester: 4, prereqs: ["72009"] },
        { code: "72017", name: "Fisiopatología", semester: 4, prereqs: ["72013"] },
        { code: "72018", name: "Traumatología y Ortopedia", semester: 4, prereqs: ["72010"] },
        { code: "72019", name: "Semiología I: Examen Físico", semester: 4, prereqs: ["72013"] },
        { code: "72020", name: "Bioética", semester: 4, prereqs: ["72009"] },
        { code: "CI-II", name: "Curso Transversal Institucional II", semester: 4, prereqs: [] },
        // Semestre 5
        { code: "72021", name: "Neurociencias", semester: 5, prereqs: ["72013", "72015"] },
        { code: "72022", name: "Semiología II: Exploración de Sistemas", semester: 5, prereqs: ["72019"] },
        { code: "72023", name: "Medicina Interna", semester: 5, prereqs: ["72017"] },
        { code: "72024", name: "Farmacología General", semester: 5, prereqs: ["72005"] },
        { code: "72025", name: "Fundamentos de Electrónica y Sistemas Digitales", semester: 5, prereqs: ["72014"] },
        { code: "72026", name: "Salud Pública", semester: 5, prereqs: ["72020"] },
        // Semestre 6
        { code: "72027", name: "Gestión en Salud Comunitaria y Liderazgo", semester: 6, prereqs: ["72026"] },
        { code: "72028", name: "Patología Médico Quirúrgica", semester: 6, prereqs: ["72023", "72024"] },
        { code: "72029", name: "Neurología", semester: 6, prereqs: ["72021"] },
        { code: "72030", name: "Procesamiento Digital de Señales", semester: 6, prereqs: ["72025"] },
        { code: "72031", name: "Fisioterapia", semester: 6, prereqs: ["72021", "72014"] },
        { code: "72032", name: "Bioestadística", semester: 6, prereqs: ["72001", "72026"] },
        // Semestre 7
        { code: "72033", name: "Imagenología", semester: 7, prereqs: ["72018"] },
        { code: "72034", name: "Pediatría", semester: 7, prereqs: ["72028"] },
        { code: "72035", name: "Metodología de la Investigación", semester: 7, prereqs: ["72032"] },
        { code: "72036", name: "Terapia Manual", semester: 7, prereqs: ["72031", "72022"] },
        { code: "72037", name: "Técnicas Kinésicas en Neurología", semester: 7, prereqs: ["72022", "72029"] },
        { code: "72038", name: "Instrumentación y Biotecnologías", semester: 7, prereqs: ["72030"] },
        // Semestre 8
        { code: "72039", name: "Geriatría", semester: 8, prereqs: ["72028", "72029"] },
        { code: "72040", name: "Terapia Física y Rehabilitación", semester: 8, prereqs: ["72036"] },
        { code: "72041", name: "Técnicas Kinésicas Cardiorrespiratorias", semester: 8, prereqs: ["72028"] },
        { code: "72042", name: "Técnicas Kinésicas en Traumatología", semester: 8, prereqs: ["72018", "72036"] },
        { code: "72043", name: "Biónica y Mecatrónica", semester: 8, prereqs: ["72038"] },
        { code: "72044", name: "Proyecto de Investigación en Kinesiología", semester: 8, prereqs: ["72035"] },
        // Semestre 9 y 10
        { code: "72045", name: "Internado de Neurokinesiología", semester: 9, prereqs: ["72039", "72040", "72041", "72042", "72043", "72044"] },
        { code: "75046", name: "Internado de Kinesiología Músculo Esquelética", semester: 9, prereqs: ["72039", "72040", "72041", "72042", "72043", "72044"] },
        { code: "75047", name: "Internado de Kinesiología Cardiorrespiratoria", semester: 9, prereqs: ["72039", "72040", "72041", "72042", "72043", "72044"] },
        { code: "72048", name: "Certificación de Competencias de Egreso", semester: 10, prereqs: ["72045", "75046", "75047"] }
    ];

    const gridContainer = document.getElementById('grid-container');
    const svgContainer = document.getElementById('arrow-container');
    const numSemesters = 10;

    // Crear columnas de semestres
    for (let i = 1; i <= numSemesters; i++) {
        const semesterColumn = document.createElement('div');
        semesterColumn.classList.add('semester-column');
        semesterColumn.id = `semester-${i}`;
        
        const semesterTitle = document.createElement('div');
        const roman = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
        semesterTitle.classList.add('semester-title');
        // Agrupar 9 y 10
        if (i === 9) {
            semesterTitle.textContent = 'SEMESTRE IX y X';
        } else if (i === 10) {
            continue; // Saltar la creación de la columna 10
        } else {
            semesterTitle.textContent = `SEMESTRE ${roman[i-1]}`;
        }
        
        semesterColumn.appendChild(semesterTitle);
        gridContainer.appendChild(semesterColumn);
    }
    
    // Posicionar los internados en la columna 9
    const semester9Column = document.getElementById('semester-9');
    const internado1 = courseData.find(c => c.code === "72045");
    const internado2 = courseData.find(c => c.code === "75046");
    const internado3 = courseData.find(c => c.code === "75047");
    internado1.semester = 9;
    internado2.semester = 9;
    internado3.semester = 9;
    
    // Posicionar la certificación en la columna 10, que es la 9 visualmente
    const cert = courseData.find(c => c.code === "72048");
    cert.semester = 9; // Visualmente en la misma columna de internados

    // Crear cajas de ramos
    courseData.forEach(course => {
        let targetSemester = course.semester;
        if (targetSemester === 10) targetSemester = 9; // Mover al 9
        
        const semesterColumn = document.getElementById(`semester-${targetSemester}`);
        
        if(semesterColumn) {
            const courseBox = document.createElement('div');
            courseBox.classList.add('course-box');
            courseBox.id = `course-${course.code}`;
            courseBox.dataset.code = course.code;

            const courseName = document.createElement('span');
            courseName.classList.add('course-name');
            courseName.textContent = course.name;

            const courseCode = document.createElement('span');
            courseCode.classList.add('course-code');
            courseCode.textContent = `Código: ${course.code}`;

            courseBox.appendChild(courseName);
            courseBox.appendChild(courseCode);
            semesterColumn.appendChild(courseBox);
        }
    });

    const allCourseBoxes = document.querySelectorAll('.course-box');

    // Lógica de interactividad
    allCourseBoxes.forEach(box => {
        box.addEventListener('mouseenter', () => {
            const currentCode = box.dataset.code;
            const coursesToUnlock = courseData.filter(c => c.prereqs.includes(currentCode));
            const prereqCourses = courseData.find(c => c.code === currentCode).prereqs;

            allCourseBoxes.forEach(b => b.classList.add('dimmed'));
            box.classList.remove('dimmed');
            
            // Highlight de ramos que desbloquea
            coursesToUnlock.forEach(unlockedCourse => {
                const unlockedBox = document.getElementById(`course-${unlockedCourse.code}`);
                if (unlockedBox) {
                    unlockedBox.classList.remove('dimmed');
                    unlockedBox.classList.add('highlight-unlocks');
                    drawArrow(box, unlockedBox);
                }
            });
            
            // Highlight de prerrequisitos
             prereqCourses.forEach(prereqCode => {
                const prereqBox = document.getElementById(`course-${prereqCode}`);
                if(prereqBox) {
                    prereqBox.classList.remove('dimmed');
                    prereqBox.classList.add('highlight-prereq');
                }
            });

        });

        box.addEventListener('mouseleave', () => {
            allCourseBoxes.forEach(b => {
                b.classList.remove('dimmed', 'highlight-unlocks', 'highlight-prereq');
            });
            clearArrows();
        });
    });

    function drawArrow(startElem, endElem) {
        const rect1 = startElem.getBoundingClientRect();
        const rect2 = endElem.getBoundingClientRect();
        const containerRect = svgContainer.getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2 - containerRect.left;
        const y1 = rect1.top + rect1.height / 2 - containerRect.top;
        const x2 = rect2.left + rect2.width / 2 - containerRect.left;
        const y2 = rect2.top + rect2.height / 2 - containerRect.top;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.classList.add('visible');
        svgContainer.appendChild(line);
    }

    function clearArrows() {
        svgContainer.innerHTML = '';
    }
});
