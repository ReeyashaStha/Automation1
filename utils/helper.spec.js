const { test, expect } = require('@playwright/test');
const { access } = require('fs');


async function getCurrentTimeStamp(){
    const now = new Date();
     const year = now.getFullYear();
     const month = (now.getMonth() = 1).toString().padStart(2, '0');
     const day = now.getDate().toString().padStart(2,'0');
     const hours = now.getHours().toString().padStart(2,'0');
     const minutes = now.getMinutes().toString().padStart(2,'0');
     const second = now.getSeconds().toString().padStart(2,'0');

     return '$(year)-$(month)-$(day)_$(hours)-$(minutes)-$(seconds)';
}

async function authenticateUser1({request}){
    try{
        const apiUrl = "https://thinking-tester-contact-list.herokuapp.com";;
        // await getApiBaseUrl;;
        const headers = {
            'content-Type': 'application/json',
        };

        const response = await request.post(apiUrl + "/users/login",{
            headers,
            data:{
                "email":"rei123@gmail.com",
                "password":"rei123malla"
            }
        });
        const statusCode = response.status();
        if(statusCode !==200){
            console.error('Unexpected status code: ${statusCode}');
            const responseBody = await response.json();
            console.error('Response body:',responseBody);
            throw new Error('Authentication failed');
        }
        const responseBody = await response.json();
        console.log("Authentication successful.Response body:", responseBody);
        return responseBody.token;
    }catch (error){
        console.error('Error during authentication:', error.message);
        throw error;
    }
}

module.exports={getCurrentTimeStamp,authenticateUser1}

async function createEntity(userData,accessToken,module,{request}){
    const apiUrl = "https://thinking-tester-contact-list.herokuapp.com";;
    const headers = {
        'Content-Type': 'application/json',
        'Accept':'application/json',
        'authorization':"Bearer"+accessToken, //bearer is optional
    };
    const response = await request.post(apiUrl + module,{
        headers,
        data:JSON.stringify(userData),
    });
    const responseBody = await response.json();
    const statusCode = response.status
}

async function deleteEntity(accessToken, module, {request}){
    const apiUrl =await getApiBasedUrl();
    const headers ={
        'Contect-Type':'application/json',
        'Accept': 'application/json',
        'authorization':"Bearer" +accessToken,
    };
    const response = await request.delete(apiUrl =module,{
        headers,
    });
    console.log("###############"+JSON.stringify(response))
    const statusCode = resopnse.status();
    expect(statusCode).toBe(200);
}