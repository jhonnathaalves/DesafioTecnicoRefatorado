function Criar_Tabela(url) {    
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
                
    xhttp.onreadystatechange = function(){
		if ( xhttp.readyState == 4 && xhttp.status == 200 ) {            
			var json =  xhttp.responseText;
			var list = JSON.parse(json);

			var cols = [];
			//recupera todas as chaves para ser o header            
			for (var i = 0; i < list.length; i++){
				for (var k in list[i]){ 
					if (cols.indexOf(k) === -1){ 

						cols.push(k); 
					} 
				} 
			} 

			// Criando os elementos da tabela 
			var table = document.createElement("table");
			table.id = "tabela";
			var thead = document.createElement("thead");
			var tbody = document.createElement("tbody");

			var tr = document.createElement("tr");

			//Criando o cabecalho
			for (var i = 0; i < cols.length; i++) {

				var th = document.createElement("th");
				var textoHead = document.createTextNode(cols[i]);
				th.appendChild(textoHead);
				tr.appendChild(th);      
			}


			thead.appendChild(tr);
			table.appendChild(thead);                        
							
			 // Populando a tabela com os dados 
							
							
			for (var i = 0; i < list.length; i++) { 
				var trBody = document.createElement("tr");
				for (var j = 0; j < cols.length; j++) { 

					var td = document.createElement("td");
					var texto = document.createTextNode(list[i][cols[j]]);
					td.appendChild(texto); 
					trBody.appendChild(td);                                
				}
				tbody.appendChild(trBody);
				table.appendChild(tbody);
	 
			} 


			var el = document.getElementById("table"); 
			el.innerHTML = ""; 
			el.appendChild(table);
							
			//datatables implementado paginacao ordenacao busca 
			$(document).ready(function() {
				$('#tabela').DataTable();
			} );


		}
    };

    xhttp.send();
                
}   