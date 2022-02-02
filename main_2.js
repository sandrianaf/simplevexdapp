
ScatterJS.plugins( Vexanium() );
		var network = ScatterJS.Network.fromJson({
			blockchain: bc('vex'),
			chainId:'f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f',
			host:'209.97.162.124',
			port:8080,
			protocol:'http'
		});
		
	

			
	
		get_data();
		
		$("#name").val('');
		$("#phone").val('');
		$("#address").val('');
		function save() {
			var name_param = document.getElementById('name').value;
			var phone_param = document.getElementById('phone').value;
			var address_param = document.getElementById('address').value;
			
			window.ScatterJS.scatter.connect('CRUD Blockchain',{network}).then(connected => {
			if(!connected) return false;
		
			window.ScatterJS.plugins( new window.ScatterEOS());
			var scatter = window.ScatterJS.scatter;
			const requiredFields = { accounts:[network] };
			console.log(requiredFields);
			scatter.getIdentity(requiredFields).then(() => {
				account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
				if (!account) return;
				
				var accountName = account.name;
				var sign = `${account.name}@${account.authority}`;
				var contract_pb = "belajarchen5";
				var vexnet = VexNet(network);
		
				vexnet.contract(contract_pb).then(contract => 
				contract.addpb({
					accs: accountName,
					name: name_param,
					phone: phone_param,
					address: address_param
				}, {
				authorization: sign
				})).then(function() {
				alert(" Success Save!", "Congratulations on your choice!", "success");
				location.reload();
				}).catch(function(exception) {
					console.log(exception);
				
				})
			})
			})
		}



	


		function get_data_update(id) {
			$("#button_save").css('display','none');
			$("#button_update").css('display','block');
					console.log('d');
				$.ajax({
					url: "https://vexascan.com/api/v1/get_table_rows/belajarchen5/belajarchen5/addressbook/20",
					method: 'get',
					dataType: 'json',
					async: false,
					cache: false,
					success: function (data) {
						
						$("#id").val(data.rows[id].id);
						$("#name").val(data.rows[id].name);
						$("#phone").val(data.rows[id].phone);
						$("#address").val(data.rows[id].address);

						
					
					}
			   });

		
		}


		function update() {
		
			var id_param = $("#id").val();
			var name_param = $("#name").val();
			var phone_param = $("#phone").val();
			var address_param = $("#address").val();
			
			window.ScatterJS.scatter.connect('CRUD Blockchain',{network}).then(connected => {
			if(!connected) return false;
		
			window.ScatterJS.plugins( new window.ScatterEOS());
			var scatter = window.ScatterJS.scatter;
			const requiredFields = { accounts:[network] };
			console.log(requiredFields);
			scatter.getIdentity(requiredFields).then(() => {
				account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
				if (!account) return;
				
				var accountName = account.name;
				var sign = `${account.name}@${account.authority}`;
				var contract_pb = "belajarchen5";
				var vexnet = VexNet(network);
		
				vexnet.contract(contract_pb).then(contract => 
				contract.update({
					id: id_param,
					user: accountName,
					name: name_param,
					phone: phone_param,
					address: address_param
				
				}, {
				authorization: sign
				})).then(function() {
				alert(" Success Update!", "Congratulations on your choice!", "success");
				location.reload();
				}).catch(function(exception) {
					console.log(exception);
				alert(exception);
				})
			})
			})
		}
	
		function deletes(id) {
			
			
			window.ScatterJS.scatter.connect('CRUD Blockchain',{network}).then(connected => {
			if(!connected) return false;
		
			window.ScatterJS.plugins( new window.ScatterEOS());
			var scatter = window.ScatterJS.scatter;
			const requiredFields = { accounts:[network] };
			console.log(requiredFields);
			scatter.getIdentity(requiredFields).then(() => {
				account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
				if (!account) return;
				
				var accountName = account.name;
				var sign = `${account.name}@${account.authority}`;
				var contract_pb = "belajarchen5";
				var vexnet = VexNet(network);
		
				vexnet.contract(contract_pb).then(contract => 
				contract.deletes({
					id:id,
					user:accountName
				
				}, {
				authorization: sign
				})).then(function() {
				alert(" Success!", "Congratulations on your choice!", "success");
				location.reload();
				}).catch(function(exception) {
					console.log(exception);
				
				
				})
			})
			})
		}


		function get_data() {
		
			var table = ''
			$('#data_table').html(table)
			$.ajax({
				url: "https://vexascan.com/api/v1/get_table_rows/belajarchen5/belajarchen5/addressbook/20",
				method: 'get',
				dataType: 'json',
				async: false,
				cache: false,
				success: function (data) {
					
					hasil = data.rows;

					$.each(hasil, function(index, value) {
						table +=
						"<tr>" +
						"<td>" + value['account'] + "</td>" +
						"<td>" + value['name'] + "</td>" +
						"<td>" + value['account'] + "</td>" +
						"<td>" + value['address'] + "</td>" +
						"<td><button class=\"btn btn-warning\" onclick=\"get_data_update("+ value['id'] + ");\">Update</button><button class=\"btn btn-danger\" onclick=\"deletes("+ value['id'] + ");\"> Delete</button></td>"+
						"</tr>"
					  });

					
					$('#data_table').html(table)
				}
		   });
    }

