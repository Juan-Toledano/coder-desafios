import { Router } from 'express';
import { generaHash } from '../utils.js';
import { UsuariosManagerMongo as UsuariosManager } from '../usuariosManager.js';
//import CartsManager from '../cartManager.js';
import { createCartService } from '../services/carts.services.js';
import passport from 'passport';

export const router = Router()

const usuariosManager = new UsuariosManager()
//const CartsManager = new CartsManager()

router.get("/error", (req, res) => {
    res.setHeader("Content-Type", "application/json")
    return res.status(500).json({ error: "error en la operacion" })
})

router.post("/registro", passport.authenticate("registro", { failureRedirect: "/api/sessions/error" }), (req, res) => {
    res.setHeader("Content-Type", "application/json")
    let { nombre, web } = req.body

    if (web) {
        return res.redirect(`/login?mensaje=Registro correcto para ${nombre}`)
    } else {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({
            message: "Registro correcto", nuevoUsuario
        })
    }
    //return res.status(201).json({ payload: "Registro exitoso", usuario: req.user })
})

router.post("/login", passport.authenticate("login", { failureRedirect: "/api/sessions/error" }), (req, res) => {

    req.session.usuario = req.user
    let { web } = req.body

    res.setHeader("Content-Type", "application/json")
    if (web) {
        res.redirect("/perfil")
    } else {
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ payload: "Login correcto", usuario });
    }


    //return res.status(201).json({ payload: "Login exitoso", usuario: req.user })
})

router.get("/github", passport.authenticate("github", {}), (req, res) => { })


router.get("/callbackGithub", passport.authenticate("github", { failureRedirect: "/api/sessions/error" }), (req, res) => {
    req.session.usuario = req.user
    console.log(req.user);

    res.setHeader("Content-Type", "application/json")
    return res.status(200).json({ payload: "login exitoso", usuario: req.user })
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

