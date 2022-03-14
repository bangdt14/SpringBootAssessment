


const createHTMLList = (index, title, description, targetDate) =>
`
<tr>
        <td>${title}</td>
        <td>${description}</td>
        <td>${targetDate}</td>
</tr>
`;

const formatDate = (inputDate) => {

    const year = new Date(inputDate).getFullYear();
    const month = new Date(inputDate).getMonth() + 1;
    const day = new Date(inputDate).getDate();

    return twoDigit(day) + "/" + twoDigit(month) + "/" + year;
}

const twoDigit = (monthDate) => {
    if (monthDate <= 9) {
        return "0" + monthDate;
    }
    else return monthDate;
}

class TodoController
{
    constructor()
    {
        this._items = [];       //create an array to store the details of items
    }

    //method to add the items into the array
    addItem(title, description, targetDate)
    {
        var todoController = this;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('targetDate', targetDate);

       fetch('http://localhost:8080/item/add', {
             method: 'POST',
             body: formData
             })
             .then(function(response) {
                 console.log(response.status);
                 if (response.ok) {
                     alert("Successfully Added Todo Item!")
                 }
             })
             .catch((error) => {
                 console.error('Error:', error);
                 alert("Error adding item to Todo List")
             });
    }


    displayItem()
        {
            var todoController = this;
            todoController._items = [];

            //fetch data from database using the REST API endpoint from Spring Boot
            fetch('http://localhost:8080/item/all')
                .then((resp) => resp.json())
                .then(function(data) {
                    console.log("2. receive data")
                    console.log(data);
                    data.forEach(function (item, index) {

                        const itemObj = {
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            targetDate: item.targetDate
                       };
                        todoController._items.push(itemObj);
                  });

                  todoController.renderItem();

                })
                .catch(function(error) {
                    console.log(error);
                });
        }

    renderItem()
    {
        var HTMLList = [];
        
        for (var i=0; i<this._items.length; i++)
        {
            const item = this._items[i];            //assign the individual item to the variable

            //const strDate = formatDate(item.targetDate);

            const itemHTML = createHTMLList(i, item.title, item.description, formatDate(item.targetDate));

            HTMLList.push(itemHTML);
        }

        //Join all the elements/items in my HTMLList array into one string, and seperate by a break
        const pHTML = HTMLList.join('\n');
        document.querySelector('#tableContent').innerHTML = pHTML;



    }


}   //End of TodoController class
