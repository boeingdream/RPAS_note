window.measure_dict = {}

function buffer_current_key(tbl_cell) {
	window.current_key = tbl_cell.textContent.trim()
	//console.log("buffer_current_key:" + window.current_key)
}

function delete_current_key() {
	delete window.current_key
}

function search_in_measure_dict(meas_name) {
	//console.log("searching", meas_name, "result:", typeof(window.measure_dict[meas_name]))
	return window.measure_dict[meas_name]
}

function update_key_dict(tbl_cell) {
	//console.log("update_key_dict with key: " + tbl_cell.textContent)
	if (window.measure_dict[tbl_cell.textContent.trim()]) {
		alert("There is already record for measure: " + tbl_cell.textContent.trim() + ", this one will be removed")
		tbl_cell.textContent = undefined
	} else if (window.current_key) {
		// key is changed, copy old object to new key
		var new_info_obj = window.measure_dict[window.current_key]
		window.measure_dict[tbl_cell.textContent.trim()] = new_info_obj
		delete window.measure_dict[window.current_key]
	} else {
		window.measure_dict[tbl_cell.textContent.trim()] = new Object()
		var cells_of_curr_row = tbl_cell.parentNode.cells
		for (var i = 1; i < cells_of_curr_row.length; i++) {
			window.measure_dict[tbl_cell.textContent.trim()][i] = cells_of_curr_row[i].textContent.trim()
		}
		//console.log("row info: ", window.measure_dict[tbl_cell.textContent])
	}
}

function remove_key_from_dict(tbl_cell) {
	delete window.measure_dict[window.current_key]
}

function buffer_current_value(tbl_cell) {
	window.current_value = tbl_cell.textContent.trim()
}

function delete_current_value(tbl_cell) {
	delete window.current_value
}

function update_meas_info(meas_key, column, value) {
	window.measure_dict[meas_key][column] = value
}

function add_key_cell_listener(tbl_cell) {
	tbl_cell.addEventListener("focus", function(event) {
		event.target.style.background = "lightskyblue"
		buffer_current_key(tbl_cell)
	})
	tbl_cell.addEventListener("blur", function(event) {
		event.target.style.background = ""
		tbl_cell.textContent = tbl_cell.textContent.trim()
		if (tbl_cell.textContent == window.current_key) {
			// do nothing
		} else if (tbl_cell.textContent) {
			// key is changed
			update_key_dict(tbl_cell)
		} else {
			// key is deleted
			remove_key_from_dict(tbl_cell)
		}
		delete_current_key()
	})
}


function add_info_cell_listener(tbl_cell) {
	tbl_cell.addEventListener("focus", function(event) {
		event.target.style.background = "lightskyblue"
		buffer_current_value(tbl_cell)
		//console.log("row key:" + tbl_cell.parentNode.firstChild.textContent + " column: " + tbl_cell.cellIndex)
	})
	tbl_cell.addEventListener("blur", function(event) {
		event.target.style.background = ""
		if (tbl_cell.textContent == window.current_value || !tbl_cell.parentNode.firstChild.textContent) {
			// do nothing
		} else {
			// update measure info object
			update_meas_info(tbl_cell.parentNode.firstChild.textContent, tbl_cell.cellIndex, tbl_cell.textContent.trim())
		}
		delete_current_value()
	})
}


function add_dymc_rows_in_table() {
	var meas_info_table = document.getElementById("meas_info_table")
	var tbl_row = document.createElement("tr")
	var tbl_col_name  = document.createElement("td")
	var tbl_col_lable = document.createElement("td")
	var tbl_col_desc  = document.createElement("td")
	var tbl_col_intx  = document.createElement("td")
	var tbl_col_notes = document.createElement("td")

	tbl_col_name.setAttribute("height", "15px")

	tbl_col_name.setAttribute("contenteditable", "true")
	tbl_col_lable.setAttribute("contenteditable", "true")
	tbl_col_desc.setAttribute("contenteditable", "true")
	tbl_col_intx.setAttribute("contenteditable", "true")
	tbl_col_notes.setAttribute("contenteditable", "true")

	meas_info_table.appendChild(tbl_row)
	tbl_row.appendChild(tbl_col_name)
	tbl_row.appendChild(tbl_col_lable)
	tbl_row.appendChild(tbl_col_desc)
	tbl_row.appendChild(tbl_col_intx)
	tbl_row.appendChild(tbl_col_notes)

	add_key_cell_listener(tbl_col_name)
	add_info_cell_listener(tbl_col_lable)
	add_info_cell_listener(tbl_col_desc)
	add_info_cell_listener(tbl_col_intx)
	add_info_cell_listener(tbl_col_notes)

}


