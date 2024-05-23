import { Router } from 'express';
import { generaHash } from '../utils.js';
import { UsuariosManagerMongo as UsuariosManager } from '../usuariosManager.js';
//import CartsManager from '../cartManager.js';
import { createCartService } from '../services/carts.services.js';

export const router = Router()

const usuariosManager = new UsuariosManager()
//const CartsManager = new CartsManager()


router.post('/registro', async (req, res) => {

    let { nombre, email, password, web } = req.body

    if (!nombre || !email || !password) {
        if (web) {
            return res.redirect(`/registro?error=Complete nombre, email, y password`)
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Complete nombre, email, y password` })
        }
    }


    let existe = await usuariosManager.getBy({ email })
    if (existe) {
        if (web) {
            return res.redirect(`/registro?error=Ya existe ${email}`)
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ya existe ${email}` })
        }
    }

    password = generaHash(password)

    try {
        let carritoNuevo = await createCartService()
        let nuevoUsuario = await usuariosManager.create({ nombre, email, password, rol: "user", carrito: carritoNuevo._id })
        
        if(nuevoUsuario){
            req.session.user= nombre
            req.session.rol = user.rol
            return res.redirect("/")
        }

        if (web) {
            return res.redirect(`/login?mensaje=Registro correcto para ${nombre}`)
        } else {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json({
                message: "Registro correcto", nuevoUsuario
            })
        }
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )
    }

})

router.post("/login", async (req, res) => {
    let { email, password, web } = req.body

    console.log(req.body)
    if (!email || !password) {
        if (web) {
            return res.redirect(`/login?error=Complete email, y password`)
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Complete email, y password` })
        }
    }

    
    let usuario = await usuariosManager.getBy({ email, password: generaHash(password) })
    if (!usuario) {
        if (web) {
            return res.redirect(`/login?error=Credenciales invalidas`)
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Credenciales inválidas` })
        }
    }

    usuario = { ...usuario }
    delete usuario.password
    req.session.usuario = usuario
    
    if (web) {
        res.redirect("/perfil")
    } else {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: "Login correcto", usuario });
    }

})

router.get("/logout", (req, res) => {
    req.session.destroy(e => {
        if (e) {
            console.log(error);
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json(
                {
                    error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                    detalle: `${error.message}`
                }
            )

        }
    })

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "Logout Exitoso...!!!" });
})