let selectedFile;
document.getElementById('input').addEventListener('change', (event) => {
	selectedFile = event.target.files[0];
});

let data = [
	{
		name : 'jayanth',
		data : 'scd',
		abc  : 'sdef'
	}
];
document.getElementById('button').addEventListener('click', () => {
	XLSX.utils.json_to_sheet(data, 'out.xlsx');
	if (selectedFile) {
		let fileReader = new FileReader();
		fileReader.readAsBinaryString(selectedFile);
		fileReader.onload = (event) => {
			let data = event.target.result;
			let workbook = XLSX.read(data, { type: 'binary' });
			/* console.log(workbook); */
			workbook.SheetNames.forEach((sheet) => {
				let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
				let names = [];
				let firstNames = [];
				let obj;
				rowObject.forEach(({ First, Last }) => {
					if (First && Last) {
						let first = First.trim().replace(/\s+\w+/, '').toLowerCase();

						let last = Last.trim().replace(/\b\w{1}\s/, '').toLowerCase();
						let fullName = `${first} ${last}`;
						if (!names.includes(fullName) && first.length) {
							names.push(fullName);

							firstNames.push(first);
						}
						obj = firstNames.reduce((count, name) => {
							count[name] = count[name] ? count[name] + 1 : 1;

							return count;
						}, {});
					}
				});
				let sortable = [];
				for (let name in obj) {
					sortable.push([ name, obj[name] ]);
				}
				let res = sortable.sort((a, b) => b[1] - a[1]); /* .filter((arr) => arr[1] >= 10); */

				console.log(obj, res);

				const div = document.getElementById('jsondata');
				for (let arr of res) {
					const h3 = document.createElement('h5');
					h3.innerText = arr;
					div.appendChild(h3);
				}
			});
		};
	}
});
