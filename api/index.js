const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const Post = require('./models/Post.js')
const User = require('./models/User.js')
const Course = require('./models/Course.js')
require('dotenv').config()
const app = express()

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'abcdef123456'







// Middleware
app.use(express.json()) // Permet de traiter les requêtes avec des données JSON
app.use(cors({
    credentials: true, // Autorise les requêtes avec des cookies
    origin: 'http://localhost:5173', // Autorise les requêtes depuis ce domaine
}))
app.use(cookieParser()) // Permet de lire les cookies





// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URL)





// Routes


// Route de test pour vérifier si le serveur fonctionne
app.get('/test', (req, res) => {
    res.json('test ok');
})







// Route d'inscription d'un nouvel utilisateur
app.post('/register', async (req, res) => {
    // Extraction des données de la requête
    const { name, email, password } = req.body
    try {
        // Création d'un nouvel utilisateur dans la base de données
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        })
        res.json(userDoc)
    } catch (e) {
        res.status(422).json(e)
    }
})







// Route de connexion d'un utilisateur existant
app.post('/login', async (req, res) => {
    // Extraction des données de la requête
    const { email, password } = req.body
    // Recherche de l'utilisateur dans la base de données
    const userDoc = await User.findOne({ email })
    if (userDoc) {
        // Vérification du mot de passe
        const passOk = bcrypt.compare(password, userDoc.password)
        if (passOk) {
            // Création d'un token JWT pour l'authentification
            jwt.sign({ email: userDoc.email, id: userDoc._id }, jwtSecret, {}, (err, token) => {
                // Ajout du token dans un cookie et envoi de la réponse avec les données de l'utilisateur
                res.cookie('token', token).json(userDoc)
            })
        } else {
            res.status(422).json('pass not ok')
        }
    } else {
        res.json('not found')
    }
})







// Route de déconnexion
app.post('/logout', (req, res) => {
    // Suppression du cookie contenant le token
    res.clearCookie('token').json(true);
})








// Route pour récupérer le profil de l'utilisateur
app.get('/profile', (req, res) => {
    // Extraction du token du cookie
    const { token } = req.cookies
    if (token) {
        // Vérification du token et envoi des données de l'utilisateur
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err
            const { name, email, _id } = await User.findById(userData.id)
            res.json({ name, email, _id })

        })
    } else {
        res.json(null)
    }
})








// Configuration de multer pour gérer les fichiers uploadés
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './client/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});






const upload = multer({ storage: storage });
// Route pour uploader un post avec un fichier
app.post('/posts/:userId', upload.single('file'), async (req, res) => {
    // Extraction de l'ID de l'utilisateur
    const { userId } = req.params
    // Extraction des données du post
    const { title, caption } = req.body;
    const file = req.file.path;
    try {
        // Création d'un nouveau post dans la base de données
        const newPost = new Post({
            userId,
            title,
            caption,
            file,
        });
        await newPost.save()
        res.status(201).json({ message: 'Post uploaded successfully' })
    } catch (error) {
        console.error('Error uploading post:', error)
        res.status(500).json({ message: 'Server error' })
    }
});


// Route pour uploader un post avec un fichier
app.post('/courses/:userId', upload.single('file'), async (req, res) => {
    // Extraction de l'ID de l'utilisateur
    const { userId } = req.params
    // Extraction des données du post
    const { title, description } = req.body;
    const file = req.file.path;
    try {
        // Création d'un nouveau post dans la base de données
        const newCourse = new Course({
            userId,
            title,
            description,
            file,
        });
        await newCourse.save()
        res.status(201).json({ message: 'Course uploaded successfully' })
    } catch (error) {
        console.error('Error uploading course:', error)
        res.status(500).json({ message: 'Server error' })
    }
});








// Route pour récupérer le profil d'un utilisateur spécifique
app.get('/profile/:userId', async (req, res) => {
    // Extraction de l'ID de l'utilisateur
    const { userId } = req.params
    try {
        // Recherche de l'utilisateur dans la base de données
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        // Récupération des posts de l'utilisateur
        const posts = await Post.find({ userId: userId })
        // Construction de l'objet userProfile contenant les données de l'utilisateur
        const userProfile = {
            profilePicture: user.profilePicture,
            username: user.name,
            userId: user._id,
            posts: posts,
            admirers: user.admirers,
        };
       res.json(userProfile)
    } catch (err) {
        console.error('Error fetching user profile:', err)
        res.status(500).json({ message: 'Server error' })
    }
});









// Route pour uploader une photo de profil
app.post('/profile/uploadPhoto', upload.single('photo'), async (req, res) => {
    // Extraction de l'ID de l'utilisateur
    const { userId } = req.body;
    const file = req.file.path;
    try {
        // Recherche de l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Mise à jour de la photo de profil de l'utilisateur
        user.profilePicture = file;
        await user.save();
        res.status(200).json({ message: 'Profile picture uploaded successfully' });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ message: 'Server error' });
    }
});








// Route pour récupérer la liste des utilisateurs
app.get('/explore', async (req, res) => {
    try {
        // Récupération de la liste des utilisateurs
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
})








// Route pour admirer ou annuler l'admiration d'un utilisateur
app.post('/users/:userId/admire', async (req, res) => {
    const { userId } = req.params;
    const { admirerId } = req.body;

    try {
        const user = await User.findById(userId);

        // Vérifier si l'admirateur est dans la liste des admirateurs
        const isAdmired = user.admirers.includes(admirerId);

        if (isAdmired) {
            // Si l'admirateur est déjà dans la liste, le supprimer
            await User.findByIdAndUpdate(userId, { $pull: { admirers: admirerId } });
        } else {
            // Sinon, l'ajouter à la liste
            await User.findByIdAndUpdate(userId, { $addToSet: { admirers: admirerId } });
        }

        // Renvoyer la nouvelle liste des admirateurs après la mise à jour
        const updatedUser = await User.findById(userId);
        res.status(200).json({ admirers: updatedUser.admirers });
    } catch (error) {
        console.error('Error admiring user:', error);
        res.status(500).json({ message: 'An error occurred while admiring user.' });
    }
});












// Route pour récupérer tous les posts de tous les utilisateurs
app.get('/posts', async (req, res) => {
    try {
        // Récupération de tous les posts de la base de données
        const posts = await Post.find().sort({ createdAt: -1 }).populate('userId', 'name');
        // Création d'un tableau de posts formaté pour l'affichage
        const formattedPosts = posts.map(post => {
            return {
                userPost: {
                    id: post.userId._id,
                    name: post.userId.name,
                    picture: post.userId.profilePicture
                },
                caption: post.caption,
                file: post.file,
                createdAt: post.createdAt,
                postId: post.id,
            };
        });
        // Envoi des posts formatés en réponse
        res.json(formattedPosts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});







// Route pour la recherche d'utilisateurs et de posts
app.get('/search', async (req, res) => {
    const { term } = req.query;
    try {
      // Recherche d'utilisateurs dont le nom correspond au terme de recherche
      const users = await User.find({ name: { $regex: term, $options: 'i' } });
      // Recherche de posts dont le titre ou la description correspond au terme de recherche
      const posts = await Post.find({
        $or: [{ title: { $regex: term, $options: 'i' } }, { caption: { $regex: term, $options: 'i' } }]
      });
      // Formatage des résultats pour l'affichage
      const formattedResults = [
        ...users.map(user => ({ _id: user._id, name: user.name, type: 'user', bio: user.bio })),
        ...posts.map(post => ({ _id: post._id, title: post.title, type: 'post', caption: post.caption }))
      ];
      res.json({ results: formattedResults });
    } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });






// Route pour afficher les reactions (evaluations, shares et comments) hors temps reel
app.get('/:userId/posts/:postId/reactions', async (req, res) => {
    const { postId } = req.params;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.status(200).json({ evaluations: post.evaluations, shares: post.shares, comments: post.comments });
    } catch (error) {
      console.error('Error fetching evaluations:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });






// Route pour la gestion des evaluations en temps reel
app.post('/:userId/posts/:postId/evaluate', async (req, res) => {
    const { postId, userId } = req.params;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      // Vérifier si l'utilisateur a déjà évalué le post
      const userIndex = post.evaluations.indexOf(userId);
      if (userIndex !== -1) {
        // L'utilisateur a déjà évalué le post, le supprimer de la liste 
        post.evaluations.splice(userIndex, 1);
        await post.save();
        res.status(200).json({ evaluations: post.evaluations });
      } else {
        // Ajouter l'utilisateur à la liste des évaluateurs
      post.evaluations.push(userId);
      await post.save();
      res.status(200).json({ evaluations: post.evaluations }); 
      }   
    } catch (error) {
      console.error('Error evaluating post:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });





// Route pour la gestion des shares en temps reel
app.post('/:userId/posts/:postId/share', async (req, res) => {
    const { postId, userId } = req.params;
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      // Vérifier si l'utilisateur a déjà partagé le post
      const userIndex = post.shares.indexOf(userId);
      if (userIndex !== -1) {
        // L'utilisateur a déjà partagé le post
        res.status(200).json({ shares: post.shares });
      } else {
        // Ajouter l'utilisateur à la liste shares
      post.shares.push(userId);
      await post.save();
      res.status(200).json({ shares: post.shares });
      } 
    } catch (error) {
      console.error('Error sharing post:', error);
      res.status(500).json({ message: 'Server error' });
    }
});





// Route pour poster un commentaire
app.post('/:userId/posts/:postId/comment', async (req, res) => {
    const { userId, postId } = req.params;
    const { comment } = req.body;
  
    try {
      // Trouver le post correspondant dans la base de données
      const post = await Post.findById(postId);
      const user = await User.findById(userId);
  
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
  
      // Ajouter le nouveau commentaire au post
      post.comments.push({ userId, userComment: user.name, userCommentPicture: user.profilePicture, comment });
  
      // Sauvegarder les modifications du post dans la base de données
      await post.save();
  
      // Répondre avec un message de succès
      res.status(200).json({ comments: post.comments });
    } catch (error) {
      console.error('Error posting comment:', error);
      res.status(500).json({ message: 'An error occurred while posting the comment.' });
    }
  });



// Route pour récupérer tous les courses de tous les utilisateurs
app.get('/courses', async (req, res) => {
    try {
        // Récupération de tous les courses de la base de données
        const courses = await Course.find().sort({ createdAt: -1 }).populate('userId', 'name');
        // Création d'un tableau de courses formaté pour l'affichage
        const formattedCourses = courses.map(course => {
            return {
                userCourse: {
                    id: course.userId._id,
                    name: course.userId.name,
                    picture: course.userId.picture
                },
                title: course.title,
                description: course.description,
                file: course.file,
                startDate: course.startDate,
                courseId: course.id,
            };
        });
        // Envoi des courses formatés en réponse
        res.json(formattedCourses);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Server error' });
    }
});








// Suivre un cours par un utilisateur
app.post('/courses/:userId/follow', async (req, res) => {
    const { courseId, userId } = req.params;
    console.log(courseId)

    try {
        // Code pour ajouter le cours suivi à l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.followedCourses.push(courseId);
        await user.save();

        res.status(200).json({followedCourses: user.followedCourses});
    } catch (error) {
        console.error('Error following course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});







// Supprime un cours suivit par un utilisateur
app.delete('/courses/:userId/unfollow', async (req, res) => {
    const { userId, courseId } = req.params;
    console.log(courseId)
    try {
        // Code pour retirer le cours suivi de l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.followedCourses = user.followedCourses.filter(course => course.toString() !== courseId);
        await user.save();

        res.status(200).json({ followedCourses: user.followedCourses});
    } catch (error) {
        console.error('Error unfollowing course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  




  
  

// Lancement du serveur sur le port 4000
app.listen(4000)



//XH3rWPckyVcLCBn8  : ProjectFromScratch   (base de données de ce projet et son mot de passe)