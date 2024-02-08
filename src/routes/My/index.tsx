import { useEffect, useRef } from 'react';
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
  PageContainer,
  ProFormInstance,
} from '@ant-design/pro-components';
import {
  App, Col, Form, Row,
} from 'antd';
import { useMutation } from '@apollo/client';
import OSSImageUpload from '../../components/OSSImageUpload';
import { UPDATE_USER } from '../../graphql/user';
import { useUserStore } from '../../stores/user.store';

export interface IUpdateUserInfoFromFields {
  tel: string;
  name: string;
  desc: string;
  avatar: {
    url?: string;
  };
}

const My = () => {
  const { message } = App.useApp();
  const formRef = useRef<ProFormInstance>();
  const userInfo = useUserStore.use.userInfo();
  const [updateUserInfo] = useMutation(UPDATE_USER);

  useEffect(() => {
    if (!userInfo.tel) return;
    formRef.current?.setFieldsValue({
      tel: userInfo.tel,
      name: userInfo.name,
      desc: userInfo.desc,
      avatar: {
        url: userInfo.avatar,
      },
    });
  }, [userInfo]);

  return (
    <PageContainer>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (values) => {
          const res = await updateUserInfo({
            variables: {
              id: userInfo.id,
              params: {
                name: values.name,
                desc: values.desc,
                avatar: values.avatar?.url || '',
              },
            },
          });

          if (res.data.updateUserInfo.code === 200) {
            message.success('更新成功');

            userInfo.refetch();

            return;
          }

          message.error(res.data.updateUserInfo.message);
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText
              name="tel"
              label="手机号"
              tooltip="不能修改"
              disabled
            />
            <ProFormText name="name" label="名称" placeholder="请输入名称" />
            <ProFormTextArea
              name="desc"
              label="简介"
              placeholder="请输入简介信息"
            />
          </Col>
          <Col>
            <Form.Item name="avatar">
              <OSSImageUpload />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default My;
