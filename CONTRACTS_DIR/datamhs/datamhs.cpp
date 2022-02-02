#include <eosio/eosio.hpp>
using namespace eosio;

class [[eosio::contract("datamhs")]] datamhs : public eosio::contract
{
public:
	datamhs(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds) {}
	[[eosio::action]] void upsert(
		name key,
		std::string nama,
		std::string jurusan)
	{
		require_auth(key);
		data_index datamahasiswa(get_self(),
								 get_first_receiver().value);
		auto iterator = datamahasiswa.find(key.value);

		if (iterator == datamahasiswa.end())
		{
			// user belum tersedia di table

			datamahasiswa.emplace(key, [&](auto &row)
								  {
			row.user = key;
			row.nama = nama; 
			row.jurusan = jurusan; });
		}
		else
		{
			// user sudah tersedia di table

			datamahasiswa.modify(iterator, key, [&](auto &row)
								 {
			row.user = key;
			row.nama = nama; 
			row.jurusan = jurusan; });
		}
	}

	[[eosio::action]] void hapus(name key)
	{
		require_auth(key);
		data_index datamahasiswa(get_self(), get_first_receiver().value);
		auto iterator = datamahasiswa.find(key.user);
		check(iterator != datamahasiswa.end(), "Record / row data tidak tersedia");
		datamahasiswa.erase(iterator);
	}

private:
	struct [[eosio::table]] mahasiswa
	{
		name user;
		std::string nama;
		std::string jurusan;

		uint64_t primary_key() const { return user.value; }
	};
	using data_index = eosio::multi_index<"infomhs"_n, mahasiswa>;
};
