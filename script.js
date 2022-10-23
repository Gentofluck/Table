const but_create = document.querySelector ("#create");
const but_delete = document.querySelector ("#delete");
const but_add = document.querySelector ("#add");
const but_remove = document.querySelector ("#remove");

const form_create = document.querySelector (".form_table_create");
const form_remove = document.querySelector (".form_table_remove");

const number_columns_input = document.querySelector ("#number_columns_input");
const number_of_row_input = document.querySelector ("#number_of_row_input");
const name_table_input = document.querySelector ("#name_table_input");

const id_head = document.querySelector ('#id');
const name_table = document.querySelector ("#name_table");

const table = document.querySelector("#main");
const table_main = document.querySelector(".table_main");
const table_header = document.querySelector(".table_header");

let number_columns = 0;
let id_next = [1];

function handler_create(e) {
	if (clickable(but_create)){
		if(is_not_show(table)&&is_not_show(form_create))
			show(form_create, 'flex');
		else{
			if (!(is_not_show(form_create))&&number_columns_input.value>1){
				no_show(form_create);
				number_columns = number_columns_input.value;
				number_columns_input.value = '';
				if (name_table_input.value!=''){
					name_table.textContent = name_table_input.value;
					show(name_table, 'block');
				}
				name_table_input.value = '';
				id_head.style.width = `calc((99vw - 16px - 26px)/${number_columns} - 38px)`;
				create_elements_input_to (number_columns-1, 'element style_clickable', 'text', table_header);
				show (table_header, 'flex');
				show (table, 'table');
			}
			else{
				if(!(is_not_show(table))){
					let elements_header = document.getElementsByClassName("element");
					replace_input_to (1, elements_header.length, 'element style_noclickable', elements_header, 'h2');
					do_clickable (but_delete);
					do_clickable (but_add);
					do_clickable (but_remove);
					do_noclickable (but_create);
				}
			}
		}
	}
	else{
		alert ("Данная кнопка сейчас недоступна");
	}
	e.preventDefault();
}
function handler_add(e){
	if (clickable(but_add)){
		let rows = document.getElementsByClassName("table_rows_space_around");
		let last_row;
		if (rows.length>0){
			last_row = rows[rows.length-1].getElementsByClassName('element');
		}
		if(rows.length==0||last_row[1].tagName=='P'){
			let header_names;
			let row = document.createElement('div');
			row.className = 'table_rows_space_around';
			const id = document.createElement ('h2');
			id.className = 'element style_noclickable';
			id.style.width = `calc((99vw - 42px)/${number_columns} - 38px)`; 
			id.innerHTML = min_id();
			row.append (id);
			create_elements_input_to (number_columns-1, 'element style_clickable', 'text', row);
			table_main.appendChild(row);
			do_noclickable(but_remove);
		}
		else{
			replace_input_to (1, last_row.length, 'element style_noclickable',last_row, 'p');
			do_clickable(but_remove);
		}
	}
	e.preventDefault();
}
function handler_remove (e){
	if (clickable(but_remove)){
		if (form_remove.style.display=='flex'){
			var deleted_id = delete_row_by_id (number_of_row_input.value);
			number_of_row_input.value = ''
			if (deleted_id!=-1){
				id_next.push(parseInt(deleted_id));
			}
			else{
				alert ('Пожалуйста введите номер существующей строки');
			}
			form_remove.style.display='';
		}
		if (form_remove.style.display==''){
			form_remove.style.display='flex';
		}
	}
	e.preventDefault();
}
function handler_delete (e){
	if (clickable(but_delete)){
		table.style.display = '';
		table_header.style.display = '';
		table_main.innerHTML = '';
		number_columns = 0;
		table_header.innerHTML ='<h2 class="element style_noclickable" id="#id">ID</h2>';
		id_head = document.querySelector ('#id');
		name_table.innerHTML = '';
		id_next = [1];
		do_noclickable (but_delete);
		do_noclickable (but_add);
		do_noclickable (but_remove);
		do_clickable (but_create);
	}
	e.preventDefault();
}


function create_elements_input_to(amount, className, type, to){
	let element;
	for (let i=0; i<amount; i++){
		element = document.createElement ('input');
		element.setAttribute('type', type);
		element.className = className;
		element.style.width = `calc((99vw - 16px - 26px)/${number_columns} - 38px)`;
		element.maxLength = Math.floor(((0.99*screen.width-42)/number_columns-38)/13);
		to.appendChild(element);
	}
}
function replace_input_to (start, end, className, elements, tag){
	let element;
	for (let i=start; i<end; i++){
		element = document.createElement(tag);
		element.className = className;
		element.style.width = elements[i].style.width; 
		element.innerHTML = elements[i].value;
		elements[i].replaceWith(element);
	}
	
}
function show(element, type){
	element.style.display = type;
}
function no_show (element){
	element.style.display = '';
}
function is_not_show(element){
	return element.style.display=='';
}
function min_id(){
	let minimum = Math.min (...id_next);
	if (id_next[0]==minimum){
		id_next[0]++;
	}
	else{
		id_next.splice(id_next.indexOf(minimum), 1);
	}
	return minimum;
}
function delete_row_by_id (id){
	let rows =  table_main.getElementsByClassName('table_rows_space_around');
	for (let i=0; i<rows.length; i++){
		if(rows[i].getElementsByClassName('element')[0].innerHTML==id){
			rows[i].remove();
			return id;
		}
	}
	return -1;
}
function clickable(element){
	return element.disabled==false;
}
function do_clickable(element){
	element.disabled = false;
	element.classList.remove('style_noclickable');
	element.classList.add('style_clickable');

}
function do_noclickable(element){
	element.disabled = true;
	element.classList.remove('style_clickable');
	element.classList.add('style_noclickable');
}
function handler_input_value (e){
	if (number_columns_input.value<2)
		number_columns_input.value = 2;
	if (number_columns_input.value>Math.round(((0.99*Math.min(screen.width, screen.height)-42)/78)))
		number_columns_input.value =  Math.round(((0.99*Math.min(screen.width, screen.height)-42)/78));
	e.preventDefault();
}


number_columns_input.addEventListener('change', handler_input_value);
but_create.addEventListener('click', handler_create);
but_add.addEventListener('click', handler_add);
but_remove.addEventListener('click', handler_remove);
but_delete.addEventListener('click', handler_delete);
