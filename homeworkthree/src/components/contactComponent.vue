<template>
    <div class = "signup middle">
        <div class="background">
            <h1>Contact us:</h1>
            <table>
                <tr>
                    <td>
                        Telephone:
                    </td>
                    <td>
                        +555 555 555
                    </td>
                </tr>
                <tr>
                    <td>
                        Email:
                    </td>
                    <td>
                        mail@coolwebsite.com
                    </td>
                </tr>
                <tr>
                    <td>
                        Address:
                    </td>
                    <td>
                        Narva mnt 18, 1008
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </template>
<script>
export default {
name: "contactComponent",
}
</script>
  
<style>
    * {
        font-family: Arial;
        box-sizing: border-box;
        font-size: large;
    }
    
    .middle {
        display: flex;
        justify-content: center;
        flex-grow: 1;
        margin: 20px;
        order: 2;
    }

    .background {
        padding: 20px;
        border-radius: 20px;
        background-color: #d8d8d8;
        margin: auto;
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    td {
        padding: 10px;
    }

</style>