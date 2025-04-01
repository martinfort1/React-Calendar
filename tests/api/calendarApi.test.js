import calendarApi from "../../src/api/calendarApi";


describe('Pruebas en el calendarApi', () => { 
    
    test('debe de tener la configuracion por defecto', () => { 
        
        // console.log({calendarApi})
        // console.log(process.env);
        expect(calendarApi.defaults.baseURL).toBe( process.env.VITE_API_URL );

     });

     test('debe de tener el x-token en el header de las peticiones', async () => { 
        
        const token = 'ABC123';
        localStorage.setItem('token', token);

        try{
          const res = await calendarApi.post('/auth', { //recordar levantar el servidor
            email: 'test@google.com',
            password: '123456'
          });
          
          expect(res.config.headers['x-token']).toBe( token );
        }
        catch(error){
          console.log(error.response.data);
        }
      });


 });