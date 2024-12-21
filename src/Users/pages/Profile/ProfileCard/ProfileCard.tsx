import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, message, Spin, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import useFetchData from '../../../../hooks/useFetchData';

const { Title } = Typography;

interface ProfileProps {
    name: string;
    initialProfileImage: string; // Initial profile image prop
}

const ProfileCard: React.FC<ProfileProps> = ({ name, initialProfileImage }) => {
    const [profileImage, setProfileImage] = useState<string>(initialProfileImage);
    const [loading, setLoading] = useState<boolean>(false);
    const { data } = useFetchData(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`);

    useEffect(() => {
        setProfileImage(data.profile_image);
    }, [data]);

    const handleImageChange = async (file: File) => {
        const formData = new FormData();
        formData.append('profile_image', file);

        setLoading(true);
        try {
            await axios.patch(`https://ayo.webtm.ru/api/v1/users/users/${localStorage.getItem('user_id')}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const newImageURL = URL.createObjectURL(file);
            setProfileImage(newImageURL);
            message.success('Изображение профиля обновлено успешно!');
        } catch (error) {
            console.error('Ошибка при обновлении изображения профиля:', error);
            message.error('Ошибка при обновлении изображения профиля.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '10px 20px' }}>
            <div style={{ position: 'relative' }}>
                <Tooltip title="Кликните, чтобы изменить аватар" placement="bottom">
                    <label htmlFor="profileImageInput" style={{ cursor: 'pointer' }}>
                        <Avatar
                            size={100}
                            icon={<UserOutlined />}
                            src={profileImage}
                            alt="Profile Image"
                        />
                        {loading && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: '50%',
                                zIndex: 1,
                            }}>
                                <Spin />
                            </div>
                        )}
                    </label>
                </Tooltip>
                <input
                    type="file"
                    id="profileImageInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageChange(file);
                    }}
                />
            </div>
            <div>
                <Title level={3}>{name}</Title>
            </div>
        </div>
    );
};

export default ProfileCard;
