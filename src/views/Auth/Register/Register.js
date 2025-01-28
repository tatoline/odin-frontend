import { Card, Form, Row, Col, Input, Select, DatePicker, Button } from "antd"
import logo from '../../../assets/logos/logo-auth.jpg'
import './Register.css'
import { useNavigate } from "react-router-dom"
import {countries} from '../../../constants/countries'
import {genders} from '../../../constants/genders'
import { useEffect, useState } from "react"
import {request} from "../../../requests/Requests";

const Register = () => {
    const [registerForm] = Form.useForm()

    const navigate = useNavigate()
    
    const [countryOptions, setCountryOptions] = useState([])
    const [isEmailExist, setIsEmailExist] = useState(false)

    useEffect(() => {
        // Fetch user's country and reorder the country list
        const fetchData = async () => {
            const userCountry = await fetchUserCountry() // Fetch the user's country
            const orderedCountries = reorderCountries(userCountry, countries)
            setCountryOptions(orderedCountries)

            // Set the user's country as the default value in the form
            if (userCountry) {
                registerForm.setFieldsValue({ country: userCountry })
            }
        }
        fetchData()
    }, [])

    const handleIsEmailExist = (email) => {
        setIsEmailExist(true)
        request.post('/user/isEmailExist', {
            email
        }).then((res) => {
            setIsEmailExist(false)
            if (res.data.isExist) {
                registerForm.setFields([{
                    name: 'email',
                    errors: ['E-mail exist.']
                }])
            }
        })
    }

    const fetchUserCountry = async () => {
        try {
            const response = await fetch("http://ip-api.com/json/?fields=country")
            const data = await response.json()
            return data.country // Returns the user's country name in English (e.g., "Germany")
        } catch (error) {
            console.error("Error fetching user country:", error)
            return null
        }
    }

    const reorderCountries = (userCountry, allCountries) => {
        const sortedCountries = [...allCountries].sort() // Sort countries alphabetically
        if (userCountry && sortedCountries.includes(userCountry)) {
            // Remove user's country from the sorted list and prepend it
            return [userCountry, ...sortedCountries.filter((country) => country !== userCountry)]
        }
        return sortedCountries
    }

    return(
        <Card className="register">
            <div className="logo-wrapper">
                <img src={logo} alt="logo"/>
            </div>
            <Form
                form={registerForm}
                layout="vertical"
                initialValues={{
                    name: '',
                    surname: '',
                    email: '',
                    country: '',
                    gender: '',
                    birthday: null,
                    password: '',
                }}
            >

                <Row gutter={16}>
                    <Col span={8}> {/** Ant Design uses 24-grid system */}
                        <Form.Item label="Name" required name="name" rules={[{required: true, message: 'Please enter your name'}]}>
                            <Input placeholder="John" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Surname" required name="surname" rules={[{required: true, message: 'Please enter your surname'}]}>
                            <Input placeholder="Doe" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Gender" required name="gender" rules={[{required: true, message: 'Please select your gender'}]}>
                            <Select>
                                {genders.map((gender) => (
                                    <Select.Option key={gender.value} value={gender.value}>{gender.label}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="E-mail" required name="email" rules={[{required: true, type: 'email', message: 'Enter a valid e-mail address'}]}>
                            <Input.Search placeholder="john.doe@odin.com" loading={isEmailExist} onChange={(e) => handleIsEmailExist(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Country" required name="country" rules={[{required: true, message: 'Please select your country'}]}>
                            <Select>
                                {countryOptions.map((country) => (
                                    <Select.Option key={country} value={country}>
                                        {country}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Date of Birth" required name="birthday" rules={[{required: true, message: 'Please select a date'}]}>
                            <DatePicker placeholder="YYYY-MM-DD" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="Password" required name="password" rules={[{required: true, message: 'Please enter a valid password'},
                            {
                                min: 8,
                                message: 'Please enter at least 8 characters'
                            }]}>
                            <Input.Password placeholder="Password" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Button type="primary" className="w-full">
                            Register
                        </Button>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Button type="link" className="w-full" onClick={() => {navigate('/auth/sign-in')}}>
                            Login
                        </Button>
                    </Col>
                </Row>

            </Form>
        </Card>
    )
}

export default Register