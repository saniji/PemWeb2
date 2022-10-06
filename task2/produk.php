<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="produk_php.css">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <p>Haloo <?php echo $_GET["nama"]; ?>!</p>
    <p>Berikut adalah data diri kamu: </p>
    <table style="width:100%">
        <tr>
            <td>Nama</td>
            <td><?php echo $_GET["nama"]; ?></td>
        </tr>
        <tr>
            <td>Tanggal Pembelian</td>
            <td><?php echo $_GET["tanggal_pembelian"]; ?></td>
        </tr>
        <tr>
            <td>Jenis Kelamin </td>
            <td><?php echo $_GET["jenis_kelamin"]; ?></td>
        </tr>
        <tr>
            <td>Barang yang dibeli</td>
            <td><?php echo $_GET["barang"]; ?></td>
        </tr>
        <tr>
            <td>Catatan(opsional)</td>
            <td><?php echo $_GET["pesan"]; ?></td>
        </tr>
    </table>

</body>
</html>