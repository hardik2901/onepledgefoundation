import bcrypt from 'bcrypt'

export default function passwordHash(myPlaintextPassword) {
    bcrypt.hash(myPlaintextPassword, 10, function (err, hash) {
        try {
            return hash;
        } catch (err) {
            res.status(err);
        }
    });
}