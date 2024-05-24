import passport from "passport";
import local from "passport-local"
import github from "passport-github2"
import { UsuariosManagerMongo as UsuariosManager } from "../usuariosManager.js";
import { CartManager } from "../cartManager.js";
import { generaHash } from "../utils.js";

const usuariosManager = new UsuariosManager()
const cartManager = new CartManager()

export const initPassport = () => {

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID: "Iv23liFeWwsdmGeFNgy6",
                clientSecret: "c5b66d0640971b93780782716cafec5173d9b1f2",
                callbackURL: "http://localhost:3000/api/sessions/callbackGithub"
            },
            async (ta, tr, profile, done) => {
                try {
                    //console.log(profile)
                    let email=profile._json.email
                    let nombre=profile._json.nombre
                    if(!email){
                        return done(null, false)
                    }
                    let usuario=await usuariosManager.getByPopulate({email})
                    if(!usuario){
                        let nuevoCarrito=await cartManager.create()
                        usuario=await usuariosManager.create(
                            {
                                nombre, email, profile, carrito: nuevoCarrito._id
                            }
                        )
                        usuario=await usuariosManager.getByPopulate({email})
                    }
                    return done(null, usuario)
                
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "registro",
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async (req, username, password, done) => {
                try {
                    let { nombre } = req.body
                    if (!nombre) {
                        return done(null, false)
                    }

                    let existe = await usuariosManager.getBy({ email: username })
                    if (existe) {
                        return done(null, false)
                    }

                    let Nuevocarrito = await cartManager.create()
                    password = generaHash(password)

                    let usuario = await usuariosManager.create({ nombre, email: username, password, carrito: Nuevocarrito._id })

                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(
        "login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (username, password, done) => {
                try {
                    if (username == "adminCoder@coder.com" && password == "adminCod3r123") {

                        let usuario = {
                            _id: "idAdmin", nombre: "admin", email: "adminCod3r123",
                            carrito: { _id: "663980cad0e550982f0db3f1" }, rol: "admin"
                        }
                        return done(null, usuario)
                    }

                    let usuario = await usuariosManager.getByPopulate({ email: username })
                    if (!usuario) {
                        return done(null, false)
                    }

                    //if(!validaPassword(password, usuario.password)){
                    //    return done(null, false)
                    //}

                    // usuario={...usuario}
                    delete usuario.password
                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id)
    })

    passport.deserializeUser(async (id, done) => {
        let usuario
        if (id === "idAdmin") {
            usuario = {
                _id: "idAdmin", nombre: "admin", email: "adminCoder@coder.com",
                carrito: { _id: "663980cad0e550982f0db3f1" }, rol: "admin"
            }
        } else {
            usuario = await usuariosManager.getBy({ _id: id })
        }
        return done(null, usuario)
    })
}