//cái này bạn tự tạo theo JSON sever hoặc 1 data Mock
const fakeApiData = 'http://localhost:3000/courses'
//đfined how to write short
const $ = document.querySelector.bind(document)
const $$ = document.querySelector.bind(document)


const listCourse = $('.list-course ul')
const inputSetName = $('input[name="name"]')
const inputSetDcription = $('input[name="decription"]')
const btnAdd = $('.btn-add')
const btnUpdateCourse = $('.btn-update')

const app = {
    //use to start app
    start: function() {
        this.getDataCourses(this.renderCourse)

        this.addNewCourse()

        this.deleteCourse()

        this.updateCourse()

    },

    //use to get data on sever
    getDataCourses: function(callback) {
        //use fetch to get data
        fetch(fakeApiData)
            .then(response => response.json())
            .then(callback)
    },

    //use to render course to view
    renderCourse: function(dataCourse) {
        var htmls = dataCourse.map((course, index) => {
            return `<li>
                        <h4>${course.name}</h4>
                        <p>${course.decription}</p>
                        <button data-id = "${course.id}">Xóa</button>
                        <button data-index = "${course.id}">Update</button>
                    </li>
                    `
        }).join('')       // match array to string
        //add element when web render
        listCourse.innerHTML = htmls
    },

    //use to add newCourse
    addNewCourse: function() {
        btnAdd.onclick = () => {
            const newName = inputSetName.value
            const newDecription = inputSetDcription.value
            //creat data to post
            var newData = {
                name: newName,
                decription: newDecription
            }

            //object is paremeters two in fetch
            var options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData)  // parse data to JSON
            }
            //variale save id course is created
            var idCreatedCourse
            // post data to sever
            fetch(fakeApiData, options)
                .then(response => response.json())
                .then(data => {
                    idCreatedCourse = data.id    //data return new course is created
                })

            //creat and add newData in last HTML DOM ul
            const itemNewData = document.createElement('li')  //creat elemnt li 

            //creat new h4
            const titleNewData = document.createElement('h4')
            const textNewTitle = document.createTextNode(`${newName}`)  // creat textNode in h4
            titleNewData.appendChild(textNewTitle)

            //creat new p
            const dicriptionNewData = document.createElement('p')
            const textdecriptionData = document.createTextNode(`${newDecription}`)    // creat textNode in p
            dicriptionNewData.appendChild(textdecriptionData)   //addTextNode

            //creat button delete
            const btnDelete = document.createElement('button')
            const textDelete = document.createTextNode('Xoá')   // creat textNode buttonDelete
            btnDelete.appendChild(textDelete)                 //add textNode

            //creat button update
            const btnUpdate = document.createElement('button')
            const textUpdate = document.createTextNode('Update')  // creat textNode buttonUpdate
            btnUpdate.appendChild(textUpdate)                   //addTextNode

            //must setTimeOut beacuse when fetch has time, wait return id course
            setTimeout(function() {
                btnDelete.setAttribute('data-id', `${idCreatedCourse}` )   //set data-id for btn
                btnUpdate.setAttribute('data-index', `${idCreatedCourse}`)
            }, 500)

            //add new h4, new p, new btnDelete, btnUpdate to li
            itemNewData.appendChild(titleNewData)
            itemNewData.appendChild(dicriptionNewData)
            itemNewData.appendChild(btnDelete)
            itemNewData.appendChild(btnUpdate)

            //add li in last HTML DOM ul
            listCourse.appendChild(itemNewData)
        }
    },


    //use to delete course 
    deleteCourse: function() {
        //listen event click ul
        listCourse.addEventListener('click', function(e) {
            //get buton delete 
            const btnDelete = e.target.closest('button[data-id]')
            if(btnDelete) {    // if is btn delete
                //select id btn delete
                const idCourse = Number(btnDelete.dataset.id);

                //is parameter two in fetch delete
                const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                    },
                }

                //use fetch to delete course in database
                fetch(fakeApiData + '/' + idCourse, options)

                //select parent of button and delete out HTML DOM
                const parentButton = btnDelete.closest('li')
                //delete parent
                if(parentButton) parentButton.remove()
                
            }
        })


    },

    updateCourse: function() {
        var btnUpdate, titleElement, paraElement
        // listen ul when click, use listen to no repaet click
        listCourse.addEventListener('click', function(e) {
            //select btn update
            btnUpdate = e.target.closest('button[data-index]')

            if(btnUpdate) {     //if has btn update
            //update name, dcription now in input
                //select element li has button
                const parentButton = btnUpdate.closest('li')
                //select element h4 of li 
                titleElement = parentButton.querySelector('h4')
                //select element p of li
                paraElement = parentButton.querySelector('p')
                //setValue for input Name
                inputSetName.value = titleElement.innerText
                //setValue for input decription
                inputSetDcription.value = paraElement.innerText


                //change button add and button up by update
                btnUpdateCourse.classList.add('active')
                btnAdd.classList.add('remove')
            }

        })

        //solve when click update
        btnUpdateCourse.onclick = function() {
            //change button
            btnUpdateCourse.classList.remove('active')
            btnAdd.classList.remove('remove')

        //update data to database use fetch
            // set data to update
            const dataUpate = {
                name: inputSetName.value,
                decription: inputSetDcription.value
            }    
            //set parameter two of fetch is object
            const options = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataUpate)
            }

            // take id of course
            const id = Number(btnUpdate.dataset.index)

            //update date use fetch
            fetch(fakeApiData + '/' + id , options)

            //change DOM Element
            titleElement.innerText = inputSetName.value
            paraElement.innerText = inputSetDcription.value
        }
    }




}

app.start()


// thank for watching


