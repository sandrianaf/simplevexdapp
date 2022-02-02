ScatterJS.plugins( Vexanium() );
const appname = document.title;
const network = ScatterJS.Network.fromJson({
	blockchain: bc('vex'),
	chainId:'f9f432b1851b5c179d2091a96f593aaed50ec7466b74f89301f957a83e56ce1f',
	host:'209.97.162.124',
	port:8080,
	protocol:'http'
});

get_data();

//let account;
var idlogin = document.getElementById('login');
var idgotin = document.getElementById('gotin');
var iduser = document.getElementById('username');
var masuk = document.getElementById('masuk');

function konekwallet() {
	try{
		ScatterJS.connect(appname,{network}).then(connected => {
			if(!connected) {
				alert ('Silahkan buka Vexwallet Desktop Anda terlebih dahulu.');
				return;
			}
			ScatterJS.login().then(id => {
			if(!id) return;
			idlogin.style = 'display:none;';
			idgotin.style = 'display:block;';
			masuk.style = 'display:block;';
			iduser.innerHTML = id.accounts[0].name;
			});
		});
	} catch (e) {
		console.log(e);
	}
}

function logout() {
		ScatterJS.logout();
		idgotin.style = 'display:none;';
		idlogin.style = 'display:block;';
}
$("#user").val('');
$("#nama").val('');
$("#jurusan").val('');

function simpan() {
	//var user_param = document.getElementById('user').value;
	var nama_param = document.getElementById('nama').value;
	var jurusan_param = document.getElementById('jurusan').value;
	
	window.ScatterJS.scatter.connect(appname,{network}).then(connected => {
	if(!connected) return false;
	
	window.ScatterJS.plugins( new window.ScatterEOS()); //untuk konek vexwallet desktop
	var scatter = window.ScatterJS.scatter;
	const requiredFields = { accounts:[network] };
	console.log(requiredFields);
	scatter.getIdentity(requiredFields).then(() => {
		account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
		if (!account) return;

		var accountName = account.name;
		var sign = [`${account.name}@${account.authority}`];
		var contract_pb = "belajarsc555"; //silahkan sesuaikan dengan smart contract Anda
		var vexnet = VexNet(network); //konfig network

		vexnet.contract(contract_pb).then(contract => 
		contract.upsert({
			key: accountName,
			nama: nama_param,
			jurusan: jurusan_param
		}, {
		authorization: sign
		})).then(function() {
		alert("Sukses", "Congratsss", "berhasil");
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
			console.log(id);
		$.ajax({
			url: "https://vexascan.com/api/v1/get_table_rows/belajarsc555/belajarsc555/infomhs/100",
			method: 'get',
			dataType: 'json',
			async: false,
			cache: false,
			success: function (data) {
				 console.log(data)
				for(let item of data.rows){
					if(item.user == id){
						$("#user").val(item.user);
						$("#nama").val(item.nama);
						$("#jurusan").val(item.jurusan);
					}
				}
			}
	   });
}

function update() {
	var user_param = $("#user").val();
	var nama_param = $("#nama").val();
	var jurusan_param = $("#jurusan").val();
	
	window.ScatterJS.scatter.connect(appname,{network}).then(connected => {
	if(!connected) return false;

	window.ScatterJS.plugins( new window.ScatterEOS());
	var scatter = window.ScatterJS.scatter;
	const requiredFields = { accounts:[network] };
	console.log(requiredFields);
	scatter.getIdentity(requiredFields).then(() => {
		account = scatter.identity.accounts.find(account => account.blockchain === 'eos');
		if (!account) return;
		
		var accountName = account.name;
		var sign = [`${account.name}@${account.authority}`];
		var contract_pb = "belajarsc555";
		var vexnet = VexNet(network);

		vexnet.contract(contract_pb).then(contract => 
		contract.upsert({
			key: accountName,
			nama: nama_param,
			jurusan: jurusan_param
		}, {
		authorization: sign
		})).then(function() {
		alert("Sukses", "Congratsss", "berhasil");
		location.reload();
		}).catch(function(exception) {
			console.log(exception);
		})
	})
	})
	get_data();
}


function get_data() {
		
	var table = ''
	$('#data_table').html(table)
	$.ajax({
		url: "https://vexascan.com/api/v1/get_table_rows/belajarsc555/belajarsc555/infomhs/100", //sesuaikan dgn smart contract Anda
		method: 'get',
		dataType: 'json',
		async: false,
		cache: false,
		success: function (data) {
			
			hasil = data.rows;
			console.log(hasil);
			$.each(hasil, function(index, value) {
				table +=
				"<tr>" +
				"<td>" + value['user'] + "</td>" +
				"<td>" + value['nama'] + "</td>" +
				"<td>" + value['jurusan'] + "</td>" +
				"<td><button onclick=\"get_data_update('"+ value['user'] + "');\">Update</button></td>"+
				"</tr>"
			});

			
			$('#data_table').html(table)
		}
   });
   
}