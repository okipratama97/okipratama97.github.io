function tambahAntrian(antree, nama, nomor, dokter, spesialis){
    let antrianBaru = {
        nama: nama,
        nomor: nomor,
        dokter: dokter,
        spesialis: spesialis
    }
    if (!antree){
        console.log("ANTRIAN INVALID")
        return "ANTRIAN INVALID"
    }
    if (antree.length >= 20){
        console.log("ANTRIAN PENUH")
        return antree
    }

    antree.push(antrianBaru)
    console.log(antrianBaru)
    console.log(`Pasien baru diterima. ${antrianBaru.nama} silahkan menunggu antrian`)
    console.log()

    return antree
}

function tambahSayaKeAntrian(antree, dokter, nama){
    let antrianBaru = {
        nama: nama,
        dokter: dokter 
    }
    if (!antree){
        console.log("ANTRIAN INVALID")
        return "ANTRIAN INVALID"
    }
    
    antree.push(antrianBaru)
    console.log(`Pasien baru diterima. ${antrianBaru.nama} silahkan menunggu antrian`)
    console.log()

    return antree
}

function kurangAntrian(antree, dokter){
    let pasien = ""
    let temp = []
    let aLength
    let notFound = false

    if (!antree){
        console.log("ANTRIAN INVALID")
        return "ANTRIAN INVALID"
    }
    if (antree.length === 0){
        console.log("ANTRIAN KOSONG")
        return "ANTRIAN KOSONG"
    }

    aLength = antree.length
    while (antree.length !== 0){
        let nama = antree[0].nama
        let dokterDipanggil = antree[0].dokter

        if (dokterDipanggil !== dokter){
            temp.push(antree.shift())
        }else{
            pasien = antree.shift()
            break
        }
    }
    
    if (temp.length === aLength){
        notFound = true
    }
    while (temp.length !== 0){
        antree.unshift(temp.pop())
    }

    if (!notFound){
        console.log(`Dokter ${dokter} siap menerima pasien`)
        console.log(`Pasien dengan nama: ${pasien.nama} silahkan menuju ke ruangan Dokter ${pasien.dokter}`)
        console.log()
    } else{
        console.log(`Dokter ${dokter} tidak memiliki calon pasien`)
        console.log()
    }



    return pasien
}

function buatAntrian(){
    let arr = []
    return arr
}

function tampilkanAntrian(antree){
    if (!antree){
        console.log("ANTRIAN INVALID")
        return "ANTRIAN INVALID"
    }
    if (antree.length === 0){
        console.log("ANTRIAN KOSONG")
        return "ANTRIAN KOSONG"
    }
   
    console.log("Menampilkan list antrian")
    for (let i = 0; i < antree.length; i++){
        let pasien = antree[i].nama
        let dokter = antree[i].dokter
        let n = antree[i].nomor

        let cout = `Antrian ke ${n}: ${pasien} ke Dokter ${dokter}`
        console.log(cout)

    }
    console.log("========================")
    console.log()
}

function buatDaftarDokter(){
    let dokter = []
    return dokter
}

function tambahDokter(arrDokter, nama, spesialis, durasi){
    let newDokter = {
        nama: nama,
        spesialis: spesialis,
        durasiKerja: durasi
    }
    arrDokter.push(newDokter)
}

function getDokter(arrDokter, spesialis){
    if (!arrDokter){
        return "DOKTER INVALID"
    }
    if (arrDokter.length === 0){
        return "DOKTER TIDAK DITEMUKAN"
    }

    for (let i = 0; i < arrDokter.length; i++){
        if (arrDokter[i].spesialis === spesialis){
            return arrDokter[i].nama
        }
    }

    return "DOKTER TIDAK DITEMUKAN"
}

function main(){
    let antrian = buatAntrian()
    let dokters = buatDaftarDokter()
    let panjangAntrian = 0

    tambahDokter(dokters,"Agus","THT",3)
    tambahDokter(dokters,"Bambang","Saraf",4)
    tambahDokter(dokters,"Cik","Umum",2)
    getDokter(dokters, "THT")

    tambahAntrian(antrian, "antree1", panjangAntrian, getDokter(dokters, "THT"), "THT")
    panjangAntrian++
    tambahAntrian(antrian, "antree2", panjangAntrian, getDokter(dokters, "Saraf"), "Saraf")
    panjangAntrian++
    tambahAntrian(antrian, "antree3", panjangAntrian, getDokter(dokters, "THT"), "THT")
    panjangAntrian++

    tampilkanAntrian(antrian)

    kurangAntrian(antrian, "Agus")
    kurangAntrian(antrian, "Bambang")
    kurangAntrian(antrian, "Cik")

    tampilkanAntrian(antrian)

    tambahAntrian(antrian, "antree4", panjangAntrian, getDokter(dokters, "Umum"), "Umum")
    panjangAntrian++
    tambahAntrian(antrian, "antree5", panjangAntrian, getDokter(dokters, "Saraf"), "Saraf")
    panjangAntrian++
    kurangAntrian(antrian, "Cik")
    
    // tambahSayaKeAntrian(antrian, dokter3)
    tampilkanAntrian(antrian)
}

main()